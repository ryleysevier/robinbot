// ==UserScript==
// @name         RobinBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       AceHax
// @update       https://github.com/ryleysevier/robinbot/blob/master/robinbot.js
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

var periwinklehp=1000;
var orangeredhp=1000;
var colorwar = {
        periwinkle:[],
        orangered:[]
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

        if (x.toLowerCase()=="#shootperiwinkle"){
            if ($.inArray(lastMessageUser, colorwar.periwinkle)){
                periwinklehp-=1;
            }
        }

        if (x.toLowerCase()=="#shootorangered"){
            if ($.inArray(lastMessageUser, colorwar.periwinkle)){
                orangeredhp-=1;
            }
        }

        if (x.toLowerCase()=="#hpreport"){
            $(".c-form-control").val("Here are the HP reports of the color teams: periwinkle Team:" + periwinklehp + " orangered Team: " + orangeredhp);
            $(".c-form-control").submit();
        }

        if(x.toLowerCase()=="#joinperiwinkle" || x.toLowerCase() == "#joinperiwinkle" ){
            var inperiwinkle =$.inArray(lastMessageUser, colorwar.periwinkle);

            var inorangered = $.inArray(lastMessageUser, colorwar.orangered);
            console.log(orangered);
            console.log(inperiwinkle);
            if(inorangered < 0 && inperiwinkle < 0){
                colorwar.periwinkle.push(lastMessageUser);
                console.log(lastMessageUser + " joined periwinkle.");
                periwinklehp+=10;
            }
        }

        if(x.toLowerCase()=="#joinorangered" || x.toLowerCase() == "#joinorangered" ){
            var inorangered1 =$.inArray(lastMessageUser, colorwar.orangered);
            var inperiwinkle1 = $.inArray(lastMessageUser, colorwar.periwinkle);

            console.log(inorangered1);
            console.log(inperiwinkle1);

            if(orangered1 < 0 && inperiwinkle1 < 0){
                colorwar.orangered.push(lastMessageUser);
                console.log(lastMessageUser + " joined orangered.");
                orangeredhp+=10;
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
        var orangeredteam = "orangered Team: " + colorwar.orangered.length + ". ";
        var periwinkleteam = "periwinkle Team: " + colorwar.periwinkle.length + ". ";
        $(".c-form-control").val("#joinperiwinkle - #joinorangered: " + orangeredteam + periwinkleteam);
        $(".c-form-control").submit();
        colorCountPost = false;
    }
}, 30000);

setInterval(function(){
    if(colorPost){
        var orangeredteam = "orangered Team: " + colorwar.orangered.toString() + ". ";
        var periwinkleteam = "periwinkle Team: " + colorwar.periwinkle.toString() + ". ";
        $(".c-form-control").val("Here are the members of the color war: " + orangeredteam + periwinkleteam);
        $(".c-form-control").submit();
        colorPost = false;
    }
}, 30000);
