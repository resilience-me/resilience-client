var AddressBookPage = new (function () {
  this.onShowTab = function () {
    $("#AddressBookTable").html("");
    _.each(
      blobVault.addressBook.getEntries(),
      function (name, addr) {
        $("#AddressBookTable").append(
          '<tr id="AddressBookEntry-' + addr + '" data-name="' + name + '" data-addr="' + addr + '">' +
            '<td class="addr">' + addr + '</td>' +
            '<td class="name">' + name + '</td>' +
            '<td class="edit">' +
              '<button class="edit" onclick="AddressBookPage.editRow(this.parentElement.parentElement)">edit</button>' +
              '<button class="save" onclick="AddressBookPage.saveRow(this.parentElement.parentElement)">save</button>' +
            '</td>' +
          '</tr>'
        );
      }
    );
  };
  
  this.editRow = function (rowElem) {
    var row = $(rowElem),
        editButton = row.find('button.edit'),
        saveButton = row.find('button.save');
    
    editButton.hide();
    saveButton.show();
    
    row.find('td.name').html($('<input>').val(row.attr('data-name')));
    row.find('td.name input').focus().keydown(function (e) {
      if (e.which == 13) saveButton.click();
    });
  }
  
  this.saveRow = function (rowElem) {
    var row = $(rowElem),
        oldName = row.attr('data-name'),
        newName = row.find('td.name input').val(),
        addr = row.attr('data-addr');
    
    if (newName) {
      row.find('button.save').hide();
      row.find('button.edit').show();
      row.find('td.name').text(newName);
      row.attr('data-name', newName);
    } else {
      row.remove();
    }
    
    // update blobVault
    blobVault.addressBook.setEntry(newName, addr);
    blobVault.save();
    
    return false;
  }
})();


$(document).ready(function () {
  // ...
});
