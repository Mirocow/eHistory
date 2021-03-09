describe('query parser', function () {

  describe('plain text', function () {

    it('should handle plain text', function () {
      var options = parseQuery('foo');
      expect(options).to.eql({
        settings: {
          from: null
        , endTime: null
        , text: 'foo'
        }
      , filters: {}
      });
    });

    it('should handle plain text with special chars', function () {
      var options = parseQuery('foo   + bar');
      expect(options).to.eql({
        settings: {
          from: null
        , endTime: null
        , text: 'foo + bar'
        }
      , filters: {}
      });
    });

  });

  describe('filters', function () {

    describe('simple filtes', function () {

      it('should handle title filter', function () {
        var options = parseQuery('title:wat');
        expect(options).to.eql({
          settings: {
            from: null
          , endTime: null
          , text: 'wat'
          }
        , filters: {
            title: 'wat'
          }
        });
      });

      it('should handle site filter', function () {
        var options = parseQuery('site:google.com');
        expect(options).to.eql({
          settings: {
            from: null
          , endTime: null
          , text: 'google.com'
          }
        , filters: {
            site: 'google.com'
          }
        });
      });

      it('should handle url filter', function () {
        var options = parseQuery('url:foobar');
        expect(options).to.eql({
          settings: {
            from: null
          , endTime: null
          , text: 'foobar'
          }
        , filters: {
            url: 'foobar'
          }
        });
      });

      it('should handle from filter', function () {
        var options = parseQuery('from:13-10-20');
        expect(options).to.eql({
          settings: {
            from: '13-10-20'
          , endTime: null
          , text: ''
          }
        , filters: {}
        });
      });

      it('should handle endTime filter', function () {
        var options = parseQuery('endTime:13-10-20');
        expect(options).to.eql({
          settings: {
            from: null
          , endTime: '13-10-20'
          , text: ''
          }
        , filters: {}
        });
      });

      it('should ignore unknown filter', function () {
        var options = parseQuery('foo:bar');
        expect(options).to.eql({
          settings: {
            from: null
          , endTime: null
          , text: 'foo:bar'
          }
        , filters: {}
        });
      });
    });

    describe('multi filters', function () {

      it('should handle time filters', function () {
        var options = parseQuery('endTime:13-10-20 from:1/1/1');
        expect(options).to.eql({
          settings: {
            from: '1/1/1'
          , endTime: '13-10-20'
          , text: ''
          }
        , filters: {}
        });
      });

      it('should handle time filters and site', function () {
        var options = parseQuery('endTime:13-10-20 from:1/1/1 site:wat.com');
        expect(options).to.eql({
          settings: {
            from: '1/1/1'
          , endTime: '13-10-20'
          , text: 'wat.com'
          }
        , filters: {
            site: 'wat.com'
          }
        });
      });

      it('should handle time filters and site', function () {
        var options = parseQuery('endTime:13-10-20 from:1/1/1 site:wat.com url:shitmang');
        expect(options).to.eql({
          settings: {
            from: '1/1/1'
          , endTime: '13-10-20'
          , text: 'wat.com shitmang'
          }
        , filters: {
            site: 'wat.com'
          , url: 'shitmang'
          }
        });
      });

    });

  });

  describe('plain text + filters', function () {

    it('should handle time filters and text', function () {
      var options = parseQuery('endTime:13-10-20 from:1/1/1 shitmang');
      expect(options).to.eql({
        settings: {
          from: '1/1/1'
        , endTime: '13-10-20'
        , text: 'shitmang'
        }
      , filters: {
        }
      });
    });

    it('should handle url + text', function () {
      var options = parseQuery('url:hah shitmang');
      expect(options).to.eql({
        settings: {
          from: null
        , endTime: null
        , text: 'hah shitmang'
        }
      , filters: {
          url: 'hah'
        }
      });
    });

    it('should handle url + ignored filter', function () {
      var options = parseQuery('url:hah shit:mang');
      expect(options).to.eql({
        settings: {
          from: null
        , endTime: null
        , text: 'hah shit:mang'
        }
      , filters: {
          url: 'hah'
        }
      });

    });

  });

});
