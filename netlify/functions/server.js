const { app } = require( '../../dist/test/server/main' ); // Import the SSR server
const server = app(); // Initialize the server

exports.handler = async ( event, context ) =>
{
  const response = await new Promise( ( resolve ) =>
  {
    const req = {
      method: event.httpMethod,
      headers: event.headers,
      url: event.path,
      body: event.body,
    };

    const res = {
      setHeader: () => { },
      end: ( body ) =>
      {
        resolve( {
          statusCode: 200,
          headers: { 'Content-Type': 'text/html' },
          body,
        } );
      },
    };

    server( req, res );
  } );

  return response;
};
