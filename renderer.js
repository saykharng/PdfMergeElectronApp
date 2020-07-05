// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const merge = require('easy-pdf-merge');

function sort_object(obj_to_sort){
    const ordered = {};
    Object.keys(obj_to_sort).sort().forEach(function(key){
        ordered[key] = obj_to_sort[key];
    });

    return ordered;
}


function merge_files() {
    merge_order_list = document.getElementsByClassName("merge_order_field");
    list_of_file = document.getElementsByClassName("form-control-file")
    
    var filepath = undefined
    var num_of_files = 0
    file_n_order = {}
    for (var i = 0; i <  merge_order_list.length; i++) {
        if (list_of_file[i].files.length > 0){
        	num_of_files += 1
            if (filepath==undefined) {
                filepath = list_of_file[i].files[0].path.replace(list_of_file[i].files[0].name, '')
            }
            merge_order_int = parseInt(merge_order_list[i].value)
            file_n_order[merge_order_int] = list_of_file[i].files[0].path
        }
    }

    if (num_of_files <= 1) {
    	var imsg = document.getElementById("issuemessage")
		imsg.innerText = "Please add two or more files.";
		return
    }


    sorted_file_n_order = sort_object(file_n_order)
    var ordered_lfm = []
    for (var key in sorted_file_n_order){
        ordered_lfm.push(sorted_file_n_order[key]);
    }

    let spawn = require("child_process");
    let path = require('electron').remote.app.getAppPath()
	
	const child = spawn.execFile(path+"./scripts/mergepdf.exe", [ordered_lfm, filepath], (error, out, err)=>{
		if (error) {
			throw error
		}
		else{
			console.log(out)
		}
	})

	var locmsg = document.getElementById("locationmessage")
	locmsg.innerText = "Merged...pdf is in: " + filepath;
	
	return true
}


