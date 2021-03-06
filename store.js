var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
};

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
};

var URL_ROOT = "https://listalous.herokuapp.com/lists/delphine";

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function(listName) {
    var loadRequest = $.ajax({
      type: 'GET',
      url: "https://listalous.herokuapp.com/lists/" + listName + "/"
    })
    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items
      notifyComponents()
    })
  },

  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: URL_ROOT + '/items',
      data: { description: itemDescription, completed: false }
    })
    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer)
      notifyComponents()
    })
  },

  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var currentCompletedValue = item.completed;

    var updateRequest = $.ajax({
      type: 'PUT',
      url: URL_ROOT + '/items/' + itemId,
      data: { completed: !currentCompletedValue }
    })

    updateRequest.done(function(itemData) {
      item.completed = itemData.completed
      notifyComponents()
    })
  },

  deleteItem: function(itemId) {
    var item = findItemById(itemId);
    var deleteRequest = $.ajax({
      type: 'DELETE',
      url: URL_ROOT + '/items/' + itemId
    });

    deleteRequest.done(function(deletedItemData) {
      items.splice(items.indexOf(item), 1);
      notifyComponents();
    })
  }
}