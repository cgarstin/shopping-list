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
		// array = ShoppingList.getCurrentList()
		//ShoppingList.GetStoredList().length > 1 ? ShoppingList.GetStoredList().split(',') : ShoppingList.GetStoredList();

		//turn nodelist into array
		// array = Array.prototype.slice.call( array, 0 );
		// var listItemIndex = array.indexOf($(this).siblings('span').text());
		// console.log($(this).parent().text(), listItemIndex);

		
		// if( listItemIndex !== -1 && array.splice(listItemIndex, 1).toString() !== 'undefined' ) {
			// ShoppingList.SetList(array.splice(listItemIndex, 1));
		// }
		// ShoppingList.SetList(array);
		ShoppingList.UpdateList()
	});
}

ShoppingList.UpdateList = function() {
	var array = [];
	$('.items li span').each(function(){
		array.push($(this).text());
		console.info(array);
	});
	ShoppingList.SetList(array);
}

ShoppingList.SubmitValue = function() {
	$('.shopping-list').on('submit', function(){

		var currentList = ShoppingList.GetStoredList();//JSON.parse(ShoppingList.GetStoredList());
		var	newItem = $('.new-item').val();
		ShoppingList.SetList(currentList, newItem);
		return false;
	});
}


ShoppingList.ChangeItem = function() {
	$('.items').on('change', 'li', function() {
		
	});
}

ShoppingList.GetStoredList = function() {
	var oldList = localStorage.getItem('Shopping List');
	return oldList;
}

ShoppingList.SetList = function(shoppingList, newItem) {
	var newList = newItem;
	var updateStoredList = function() {
		console.log('oops');
		localStorage.setItem('Shopping List', newList);
		ShoppingList.BuildList(newList);
	}
	if( shoppingList === null || ( shoppingList === undefined && shoppingList === 'undefined') {
		newList = newItem;
		updateStoredList();
	} else if (typeof newItem === 'undefined') {
		newList = shoppingList;
		updateStoredList();
	} else if ( newItem !== 'undefined' && ( shoppingList !== null || ( shoppingList === undefined && shoppingList === 'undefined') )) {
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
	ShoppingList.setList = new ShoppingList.SetList();
	ShoppingList.buildList = new ShoppingList.BuildList();
	ShoppingList.removeItem = new ShoppingList.RemoveItem();
});
