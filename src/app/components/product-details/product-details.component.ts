import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.updateMeta();
    });
  }

  updateMeta() {
    this.title.setTitle(this.product.title);
    this.meta.updateTag({
      property: 'og:title',
      content: this.product.title
    });

    this.meta.updateTag({
      property: 'og:image',
      content: this.product.image
    });

    this.meta.updateTag({
      property: 'og:image:width',
      content: '1200',
    });

    this.meta.updateTag({
      property: 'og:image:height',
      content: '630',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.meta.updateTag({
        property: 'og:url',
        content: window.location.href,
      });
    }
  }
}
