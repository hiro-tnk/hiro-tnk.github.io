var map = document.querySelector('#map');
map.addEventListener("load",function() {
    $map = $(map.contentDocument).children();
    $map.children("g").not("#swi,#A,#F").click(function(e){
        var y=(e.pageY)*560/$map.height();
        var x=(e.pageX)*610/$map.width();
        switch ($('input[name=mode]:checked').val()){
            case "move":
                if(state=="gun_selected"){
                    $map.find("[no="+selected+"]").attr("transform","translate("+x+","+y+")");
                    land_occupation($(this),$map.find("[no="+selected+"]").attr("class"));
                    state="normal";
                }
                break;
            case "army":
                set_army(x,y,$('input[name=country]:checked').val());
                break;
            case "fleat":
                set_fleat(x,y,$('input[name=country]:checked').val());
                break;
            case "occup":
                land_occupation($(this),$('input[name=country]:checked').val());
        }
    });
    initialize();
}, false);

function land_occupation($area, country_name){
    $area.find("polygon:not('.w'),polyline:not('.w')").each(function(){
        this.setAttribute('class', country_name) ;
    });
}

function set_army(posx, posy, country_name){
    var army = $("#A:first",$map).clone(true);
    $map.append(army);
    $map.find("#A:last").attr({
        "class":country_name,
        "transform":"translate("+posx+","+posy+")",
        "no":""+gun_num
    });
    $map.find("#A:last").click(function(){
        switch ($('input[name=mode]:checked').val()){
            case "move":
                state="gun_selected";
                selected=$(this).attr("no");
                break;
            case "del":
                $(this).remove();
                break;
        };
    });
    gun_num+=1;
}

function set_fleat(posx, posy, country_name){
    var fleat = $("#F:first",$map).clone(true);
    $map.append(fleat);
    $map.find("#F:last").attr({
        "class":country_name,
        "transform":"translate("+posx+","+posy+")",
        "no":""+gun_num
    });
    $map.find("#F:last").click(function(){
        switch ($('input[name=mode]:checked').val()){
            case "move":
                state="gun_selected";
                selected=$(this).attr("no");
                break;
            case "del":
                $(this).remove();
                break;
        };
    });
    gun_num+=1;
}


function initialize(){
    land_occupation($map.find("g").not("#swi,#A,#F"),"l");
    $map.find("#A,#F").not("[no=-1]").remove();


    land_occupation($("#stp,#mos,#sev,#lvn,#war,#fin,#ukr",$map),"Russia");
    land_occupation($("#arm,#syr,#smy,#ank,#con",$map),"Turkey");
    land_occupation($("#bud,#tri,#vie,#gal,#boh,#tyr",$map),"Austria");
    land_occupation($("#ven,#apu,#nap,#rom,#tus,#pie",$map),"Italy");
    land_occupation($("#mar,#gas,#bur,#pic,#par,#bre",$map),"France");
    land_occupation($("#pru,#sil,#ber,#mun,#kie,#ruh",$map),"Germany");
    land_occupation($("#edi,#cly,#lvp,#yor,#lon,#wal",$map),"England");

var R="Russia";
var T="Turkey";
var A="Austria";
var I="Italy";
var G="Germany";
var E="England";
var F="France";

    gun_num=0;
    set_fleat(418,205,R); //stp_sc 
    set_army(505,226,R); //mos
    set_fleat(515,330,R); //sev
    set_army(361,315,R); //war
    set_fleat(500,460,T); //ank
    set_army(439,473,T); //con
    set_army(490,505,T); //smy
    set_fleat(305,412,A); //tri
    set_army(314,360,A); //vie
    set_army(353,378,A); //bud
    set_army(250,408,I); //ven
    set_army(264,452,I); //rom
    set_fleat(299,505,I); //nap
    set_army(243,347,G); //mun
    set_fleat(243,295,G); //kie
    set_army(279,283,G); //ber
    set_fleat(125,334,F); //bre
    set_army(184,402,F); //mar
    set_army(162,346,F); //par
    set_fleat(162,281,E); //lon
    set_army(142,241,E); //lvp
    set_fleat(157,210,E); //edi

}

