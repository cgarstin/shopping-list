var ShoppingList=ShoppingList||{};

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

ShoppingList.RemoveItem = function() {
	$('.items').on('click', '.remove', function(event) {

		$(this).parent().remove();
		ShoppingList.UpdateList()
	});
}

ShoppingList.UpdateList = function() {
	var array = [];
	$('.items li span').each(function(){
		array.push($(this).text());
	});
	ShoppingList.SetList(array.reverse());
}

ShoppingList.SubmitValue = function() {
	$('.shopping-list').on('submit', function(){

		var currentList = ShoppingList.GetStoredList();
		var	newItem = $('.new-item').val();
		ShoppingList.SetList(currentList, newItem);
		return false;
	});
}


ShoppingList.ChangeItem = function() {
	$('.items').on('blur', 'li', function() {
		ShoppingList.UpdateList();
	});
}

ShoppingList.GetStoredList = function() {
	var oldList = localStorage.getItem('Shopping List');
	return oldList;
}

ShoppingList.SetList = function(shoppingList, newItem) {
	if(shoppingList === 'init') {
		return false;
	}
	var newList = newItem;

	var updateStoredList = function() {
		localStorage.setItem('Shopping List', newList);
		ShoppingList.BuildList(newList);
	}
	if( shoppingList === null || ( shoppingList === undefined && shoppingList === 'undefined') ) {
		newList = newItem;
		updateStoredList();
	} else if (typeof newItem === 'undefined' && ( shoppingList.constructor === Array && shoppingList.length > 0 ) ) {
		newList = shoppingList;
		updateStoredList();
	} else if ( ( typeof newItem !== undefined && newItem !== 'undefined' )
							&& ( shoppingList !== null || ( shoppingList === undefined && shoppingList === 'undefined'))
							&& ( (shoppingList.constructor === Array && shoppingList.length > 0) || shoppingList.toString().length >0 )
						) {
		newList = shoppingList + ',' + newItem;
		updateStoredList();
	}
}

ShoppingList.BuildList = function(shoppingList) {
	if(shoppingList && shoppingList.length > 0) { 	
		var listArray = shoppingList.toString().split(',');
		$('.items').empty()
		$.each(listArray, function(index, value){
			$('.items').prepend('<li><span contenteditable="true">' + value + '</span> <a class="remove"></a></li')
		});
	}
}

$(function(){
	ShoppingList.updateList = new ShoppingList.UpdateList();
	ShoppingList.submitValue = new ShoppingList.SubmitValue();
	ShoppingList.getStoredList = new ShoppingList.GetStoredList();
	ShoppingList.changeItem = new ShoppingList.ChangeItem();
	ShoppingList.setList = new ShoppingList.SetList('init');
	ShoppingList.buildList = new ShoppingList.BuildList();
	ShoppingList.removeItem = new ShoppingList.RemoveItem();
});
