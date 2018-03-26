//alert(1);
$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
  //alert(1);
  const confirmation = confirm ('Are you sure?');
  if(confirmation){
    //alert(1);
    $.ajax({
      type: 'DELETE',
      url: '/users/delete/'+$(this).data('id')
    }).done(function(response){
        window.location.replace('/');
    });
  } else {
      return false;
  }
}
