const Response = require('./response');

describe('Response Helper', () => {
  it('should create a response with default values', () => {
    const response = new Response();
    
    expect(response.status).toBe(false);
    expect(response.code).toBe(400);
    expect(response.message).toBe('');
    expect(response.data).toBe(null);
  });

  it('should create a successful response', () => {
    const response = new Response(true, 200, 'Success', { id: 1 });
    
    expect(response.status).toBe(true);
    expect(response.code).toBe(200);
    expect(response.message).toBe('Success');
    expect(response.data).toEqual({ id: 1 });
  });

  it('should create an error response', () => {
    const response = new Response(false, 404, 'Not found', null);
    
    expect(response.status).toBe(false);
    expect(response.code).toBe(404);
    expect(response.message).toBe('Not found');
    expect(response.data).toBe(null);
  });
});
