const queries = require('./index');

describe('Queries Index', () => {
  it('should export getMoviesList', () => {
    expect(queries.getMoviesList).toBeDefined();
    expect(typeof queries.getMoviesList).toBe('function');
  });

  it('should export getMovieById', () => {
    expect(queries.getMovieById).toBeDefined();
    expect(typeof queries.getMovieById).toBe('function');
  });

  it('should export getMovieShowingsByMovieId', () => {
    expect(queries.getMovieShowingsByMovieId).toBeDefined();
    expect(typeof queries.getMovieShowingsByMovieId).toBe('function');
  });

  it('should export createMovieBooking', () => {
    expect(queries.createMovieBooking).toBeDefined();
    expect(typeof queries.createMovieBooking).toBe('function');
  });
});
