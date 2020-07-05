function formatString(str, params) {
    for (let i = 0; i < params.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, params[i]);
    }
    return str;
}

function maintain_unique_merge_order_number(e){
    list_of_merge_order = document.querySelectorAll('[class=merge_order_field]');
    fix_order_of_number(e, list_of_merge_order);
}


function stripToNums(str) {
    return str.replace(/\D/g, '');
}

function find_new_file_number(){
    var new_file_number = 1;
    var list_of_file = document.querySelectorAll('[type=file]');

    for( var file_index=0; file_index < list_of_file.length; file_index++ ){
        var file_number = parseInt(stripToNums(list_of_file[file_index].name));
        if(file_number >= new_file_number){
            new_file_number = file_number+1;
        }
    }
    return new_file_number;
}

function add_another_attachment(){
    // var new_number_file = document.querySelectorAll('[type=file]').length;
    var new_number_file = find_new_file_number()
    // if(new_number_file < 2){
    //     new_number_file = 1;
    // }else{
    //     new_number_file = new_number_file;
    // }
    var new_div = document.createElement("div");
    new_div.className = "form-group row";
    new_file_field = "File" + new_number_file.toString();
    new_div.id = new_file_field + "_Details";

    str_inner_html = formatString(' <div class="col-sm-1"><label for="{0}" class="col-sm-1 col-form-label">{0}</label></div><div class="col-md"><input type="file" class="form-control-file form-control-sm" id="{0}" name="{0}"></div><div class="col-sm-1"><input class="merge_order_field" id="{0}_merge_order" name="{0}_merge_order" type="number" min="0" max="30" value="{1}" step="1" /> </div><div class="col-sm-1"><button class="removeline btn btn-link" id="{0}_remove">X</button></div>', [new_file_field, new_number_file])
    new_div.innerHTML = str_inner_html
    
    btn_add_another_file = document.getElementById("beforeme");
    btn_add_another_file.parentNode.insertBefore(new_div, btn_add_another_file);

    new_removeline = new_file_field+"_remove"
    btn_nr = document.getElementById(new_removeline)
    btn_nr.addEventListener("click", remove_file_detail_line)
}


function remove_file_detail_line(item){
    var targetId = item.toElement.id;
    // console.log(targetId)
    var filenumber = targetId.split('_')[0];
    filenumber = filenumber+"_Details";
    line_to_remove = document.getElementById(filenumber);
    line_to_remove.parentNode.removeChild(line_to_remove);

}

window.addEventListener('DOMContentLoaded', (event) => {
    btn_add_another_file = document.getElementById("add_another_file");
    btn_add_another_file.addEventListener("click", add_another_attachment);
    console.log('hi')
    btn_removefile = document.getElementsByClassName("removeline")

    for (var i = 0; i < btn_removefile.length; i++) {
        btn_removefile[i].addEventListener("click", remove_file_detail_line);
    }

    btn_merge = document.getElementById("mergebtn")
    btn_merge.addEventListener("click", merge_files);

    // count_chceked_merge_checkboxes();
});