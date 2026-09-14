export default {
  async fetch(request, env) {
    const USERNAME = "admin";
    const PASSWORD = "Octave2026!";

    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return new Response('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Octave Protected Audit Report"',
        },
      });
    }

    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');

      if (user === USERNAME && pass === PASSWORD) {
        // Authenticated successfully: serve the static file (index.html)
        return env.ASSETS.fetch(request);
      }
    }

    // Invalid credentials
    return new Response('Invalid Credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Octave Protected Audit Report"',
      },
    });
  }
};