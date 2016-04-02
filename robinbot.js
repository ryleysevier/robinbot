// ==UserScript==
// @name         ColorFinder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AceHax
// @match        http://tampermonkey.net/index.php?version=4.0&ext=dhdg&updated=true
// @include      https://www.reddit.com/robin*
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==
$( document ).ready(function(){
    setTimeout(function(){$(".robin--vote-class--increase").click();
    $(".c-form-control").val("I'm running RobinBot, type #color to see your color!");
    $(".c-form-control").submit();}, 10000);
});

var currentMessage = $(".robin-message").last().find("span.robin-message--message").text();

var outputQueue = [""];

var postColors = "#color : ";
var colorsToPost = [];

var redhp=1000;
var bluehp=1000;
var colorwar = {whitegold:[],
    blueblack:[]
};

var colorPost = false;
var colorCountPost = false;

setInterval(function(){

    var lastDiv = $(".robin-message").last();
    var lastMessage = lastDiv.find("span.robin-message--message").text();

    if(lastMessage != currentMessage){
        currentMessage= lastMessage;
        var lastMessageUser = lastDiv.find("span.robin-message--from.robin--username").text();
        var x = lastDiv.find("span.robin-message--message").text();

        console.log(lastMessage);
        console.log(lastMessageUser);
        console.log(x);

        if (x.toLowerCase()=="#shootred"){
            if ($.inArray(lastMessageUser, colorwar.blackblue)){
                redhp-=1;   
            }
        }
        
        if (x.toLowerCase()=="#shootblue"){
            if ($.inArray(lastMessageUser, colorwar.whitegold)){
                bluehp-=1;   
            }
        }
        
        if (x.toLowerCase()=="#hpreport"){
            $(".c-form-control").val("Here are the HP reports of the color teams: Red Team:" + redhp + " Blue Team: " + bluehp);
            $(".c-form-control").submit();
        }
        
        if(x.toLowerCase()=="#joinred" || x.toLowerCase() == "#joingoldwhite" ){
            var inwhitegold =$.inArray(lastMessageUser, colorwar.whitegold);
            
            var inblackblue = $.inArray(lastMessageUser, colorwar.blackblue);
            console.log(inwhitegold);
            console.log(inblackblue);
            if(inwhitegold < 0 && inblackblue < 0){
                colorwar.whitegold.push(lastMessageUser);
                console.log(lastMessageUser + " joined red.");
                redhp+=100;
            }
        }

        if(x.toLowerCase()=="#joinblue" || x.toLowerCase() == "#joinblueblack" ){
            var inwhitegold1 =$.inArray(lastMessageUser, colorwar.whitegold);
            var inblackblue1 = $.inArray(lastMessageUser, colorwar.blackblue);
            
            console.log(inwhitegold1);
            console.log(inblackblue1);
            
            if(inwhitegold1 < 0 && inblackblue1 < 0){
                colorwar.blueblack.push(lastMessageUser);
                console.log(lastMessageUser + " joined blueb.");
                bluehp+=100;
            }
        }

        if(x.toLowerCase()=="#colorreport"){
            console.log("prepare the color report!");
            colorPost = true;
        }

        if(x.toLowerCase()=="#colorcount"){
            colorCountPost = true;
        }
        
        if(x.toLowerCase()=="#color" || x.toLowerCase()=="#colour"){
            console.log("color command go!");

            if(lastDiv.hasClass('robin--flair-class--flair-0')){
                colorsToPost.push(lastMessageUser + ":red,");
            }

            if(lastDiv.hasClass('robin--flair-class--flair-1')){
                colorsToPost.push(lastMessageUser + ":orange,");
            }

            if(lastDiv.hasClass('robin--flair-class--flair-2')){
                colorsToPost.push(lastMessageUser + ":yellow,");
            }

            if(lastDiv.hasClass('robin--flair-class--flair-3')){
                colorsToPost.push(lastMessageUser + ":green,");
            }

            if(lastDiv.hasClass('robin--flair-class--flair-4')){
                colorsToPost.push(lastMessageUser + ":blue,");
            }

            if(lastDiv.hasClass('robin--flair-class--flair-5')){
                colorsToPost.push(lastMessageUser + ":purple,");
            }
        }
    }
}, 100);

setInterval(function(){
    output = "";
    console.log(colorsToPost);
    if(colorsToPost.length > 0){
        output += postColors;
        for(var i=0;i<colorsToPost.length;i++){
            if(output.length > 140){ i=colorsToPost.length;}
            if(colorsToPost[i].length + output.length < 140){
                output += colorsToPost[i];
                colorsToPost.shift();
                i--;
            }
        }
        $(".c-form-control").val(output);
        $(".c-form-control").submit();
    }
}, 15000);

setInterval(function(){
    if(colorCountPost){
        var blueblackteam = "Blue Team: " + colorwar.blueblack.length + ". ";
        var whitegoldteam = "Red Team: " + colorwar.whitegold.length + ". ";
        $(".c-form-control").val("#joinred - #joinblue: " + blueblackteam + whitegoldteam);
        $(".c-form-control").submit();
        colorCountPost = false;
    }
}, 30000);

setInterval(function(){
    if(colorPost){
        var blueblackteam = "Blue Team: " + colorwar.blueblack.toString() + ". ";
        var whitegoldteam = "Red Team: " + colorwar.whitegold.toString() + ". ";
        $(".c-form-control").val("Here are the members of the color war: " + blueblackteam + whitegoldteam);
        $(".c-form-control").submit();
        colorPost = false;
    }
}, 30000);
