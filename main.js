function serialize() {
	var IDs = [];
	$('#sortable tr[id^="post-"]').each(function () {
		IDs.push(parseInt(this.id.replace('post-', '')));
	});

	var result = '';
	IDs.forEach(function (item, index) {
		result += 'post[]=' + item;
		if (index !== IDs.length - 1) {
			result += '&';
		}
	});
	return result;
}

$(document).ready(function () {

	$('#sortable').sortable({
		items: 'tbody',
		start: function () {
			$('[data-group="group"] tr:not(:first-child)').removeClass('show');
		},
		update: function () {
			console.log(serialize());
		},
	});
	$('#sortable').disableSelection();

	$('[data-group="group"] tr:first-child').on('click', function () {
		var $group = $(this).parent();
		var $rows = $group.find('tr:not(:first-child)');
		$rows.toggleClass('show');
		$group.sortable({
			items: 'tr:not(:first-child)',
			connectWith: $group,
			update: function () {
				console.log(serialize());
			},
		});
		$group.disableSelection();
	})
});