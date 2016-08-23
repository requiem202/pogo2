function sortNameThenCp(list) {
    console.log(list);
    list.sort('name', {
        sortFunction: function(itemA, itemB, options) {
            options.desc = false;
            var a_name = itemA.values()['name'],
                b_name = itemB.values()['name'],
                a_cp = Number(itemA.values()['cp']),
                b_cp = Number(itemB.values()['cp']);

            if (a_name == b_name) {
                if (a_cp == b_cp) {
                    return 0;
                }
                if (a_cp > b_cp) {
                    return 1;
                }
                return -1;
            }
            if (a_name > b_name) {
                return 1;
            }
            return -1;
        }
    });
}
function sortNameThenIv(list) {
    console.log(list);
    list.sort('name', {
        sortFunction: function(itemA, itemB, options) {
            options.desc = false;
            var a_name = itemA.values()['name'],
                b_name = itemB.values()['name'],
                a_iv = Number(itemA.values()['iv']),
                b_iv = Number(itemB.values()['iv']);

            if (a_name == b_name) {
                if (a_iv == b_iv) {
                    return 0;
                }
                if (a_iv > b_iv) {
                    return 1;
                }
                return -1;
            }
            if (a_name > b_name) {
                return 1;
            }
            return -1;
        }
    });
}