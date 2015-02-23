App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.RedditSearch.findAll('aww');
  }
});

App.IndexController = Ember.ObjectController.extend({
  subredditHeader: 'aww',
  actions: {
    loadList: function() {
      var value = this.get('subreddit');
      if(value) {
        this.set('subredditHeader', value);
        this.set('model', App.RedditSearch.findAll(value));
        this.set('subreddit', '');
		  }
    }
	}
});

App.RedditSearch = Ember.Object.extend({
  thumbnailUrl: function(){
    var thumbnail = this.get('thumbnail');
      return(thumbnail ==='default')?null:thumbnail;
    }.property('thumbnail')
});

App.RedditSearch.reopenClass({
  findAll: function(subreddit) {
    var links = [];
    $.getJSON('http://www.reddit.com/r/' + subreddit + '/.json?jsonp=?').then(function(response) {
      response.data.children.forEach(function(child) {
        links.pushObject(App.RedditSearch.create(child.data));
      });
    });
    return links;
  }
});
