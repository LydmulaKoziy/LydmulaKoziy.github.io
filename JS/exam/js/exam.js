$(document).ready(function () {

    $('#play-button').click(function() {
        $(this).css('display','none');
        $('.wrap').addClass('game_started');
        init();
        play_game();
    });

    $('#play-next-round-button').click(function() {
        $(this).css('display','none');
        play_game();
    });

    $('#gun_man_wrapper').click(function () {
        if(!user_can_shoot && !user_did_shoot){
            play_next_sound('shot-fall.m4a');
            user_did_shoot = true;
            fire_foul();
        }
        if(user_can_shoot && !user_did_shoot){

            user_shoot_time = timer_seconds*1000+timer_millisec*10;
            if(user_shoot_time > gunman_time){
                play_sound('shot-fall.m4a');
                return false;
            }
            play_next_sound('shot.m4a');
            user_did_shoot = true;
            user_can_shoot = false;

            $('#user_time_'+side+' .time').text(humanize_time());
            setTimeout('blink_user_shoot_time()',500);
            round++;
            gunman_is_killed();

        }
    });
})

function init(){
    prev_gun_men = 0;
    zero_position_number = -55;
    zero_position = zero_position_number+'px';
    user_score = 0;
    gun_man_reward = 2400;
    user_life = 3;
    round = 1;
    running = true;

    $('#won.hidden').removeClass('hidden');
    $('#life.hidden').removeClass('hidden');
}

function play_round(){
    if(user_life == 0){
        return game_over();
    }
    if($('#show_next_round_button').is(':checked')){
        $('#play-next-round-button').css('display','block');
        return true;
    }
    play_game();
}

function play_game () {
    $("#gun_man_wrapper").removeClass();
    get_gunman_round_time();
    user_can_shoot = false;
    user_did_shoot = false;
    timer_millisec = 0;
    timer_seconds = 0;
    user_shoot_time = 0;
    blink = 0;
    bonuses = 0;
    $('#gun_man_wrapper').css('display','block');
    current_gun_man = getRandomInt(1,5);
    build_gun_man();
    $('#score').text(formating_score(user_score));
    $('#won').text(round);
    $('#life').text(user_life);
    display_shoot_time();
    play_sound('intro.m4a', true);
    move();
    return true
}
 function play_sound(sound, loop) {
     var loop = loop || false;
     audio = new Audio('sound/' + sound);
     if (loop) {
         audio.addEventListener('ended', function () {
             this.currentTime = 0;
             this.play();
         }, false);
    }
     audio.play();

 }

function play_next_sound(sound, loop){
    var loop = loop || false;
    audio.pause();
    audio.currentTime = 0;
    play_sound(sound,loop);
}
function gunman_is_killed(){
    display_you_won();
    $('#gun_man_wrapper').removeClass('fire');
    $('#gun_man_wrapper').removeClass('step1');
    $('#gun_man_wrapper').removeClass('step2');
    $('#gun_man_wrapper').removeClass('step3');
    show_dead_gunman();
    $('#hat').addClass('h_gun_man_' + current_gun_man);
    move_hat();

}

function display_bonuses(){
    $('#notifications').removeClass('you_won');
    $('#notifications').removeClass(side);
    if(user_shoot_time == gunman_time){
        setTimeout('calculate_score()',2000);
        return true;
    }
    user_shoot_time = user_shoot_time - user_shoot_time%100;
    $('#notifications').addClass('bonus');
    $('#notifications span').text('Bonuses: 00000');
    calculate_bonuses();
}

function calculate_score(){
    $('#notifications').removeClass('bonus');
    $('#notifications').css('display','none');
    user_score = parseInt($('#score').text()) + bonuses + gun_man_reward;
    return true;
}

function calculate_bonuses(){
    if(user_shoot_time - gunman_time != 0){
        user_shoot_time = user_shoot_time+100;
        bonuses = bonuses+1000;
        $('#notifications span').text('Bonuses: '+bonuses);
    }else{
        setTimeout('calculate_score()',2000);
        return true;
    }
    setTimeout("calculate_bonuses()",50);
}

function move_hat(){
    if(current_gun_man == 3){
        $('#hat').addClass('move_up');
       return move_hat_3();
    }else if(current_gun_man == 1 || current_gun_man == 4 || current_gun_man == 5){
        $('#hat').addClass('move_up');
        move_hat_up_down();
    }
    else{
        $('#hat').removeClass('h_gun_man_' + current_gun_man);
        setTimeout('display_bonuses()',2000);
        return true;
    }
}

function move_hat_up_down(){
    var bottom = parseInt($('#hat').css('bottom').replace("px", ""));
    if( $('#hat').hasClass('move_up')){
        if(bottom > 150){
            $('#hat').addClass('move_down');
            $('#hat').removeClass('move_up');
        }else {
            $('#hat').css('bottom', bottom + 5 + 'px');
        }
    }else if($('#hat').hasClass('move_down')){
        if(bottom < 20 || (current_gun_man == 4 && bottom < 40)){
            $('#hat').removeClass('move_down');
            display_bonuses();
            return true;
        }else{
            $('#hat').css('bottom', bottom - 5 + 'px');
        }
    }
    setTimeout('move_hat_up_down()',100);
}

function move_hat_3(){
    var bottom = parseInt($('#hat').css('bottom').replace("px", ""));
    var right = parseInt($('#hat').css('right').replace("px", ""));
    if( $('#hat').hasClass( 'move_up')){
        $('#hat').css( 'bottom',bottom+5+'px' );
        $('#hat').css( 'right',right-5+'px');
        if(bottom > 250){
            $('#hat').removeClass( 'move_up');
        }
    }else{
        $('#hat').css( 'bottom',bottom-5+'px');
        $('#hat').css( 'right',right-5+'px');
        if(bottom < 20){
            $('#hat').removeClass('gun_man_' + current_gun_man);
            $('#hat').removeClass('move_down');
            display_bonuses();
            return true;
        }
    }
    setTimeout('move_hat_3()',50);
}

function show_dead_gunman(){
    var position = parseInt($('#gun_man_wrapper').css('bottom').replace("px", ""));
    if($('#gun_man_wrapper').hasClass('is_killed_step_1')) {
        if ( position == 175 + 40) {
            $('#gun_man_wrapper').removeClass('is_killed_step_1');
            $('#gun_man_wrapper').addClass('is_killed_step_2');
            $('#gun_man_wrapper').addClass('move_down');
        }else{
            if(current_gun_man != 2 && current_gun_man != 3) {
                $('#gun_man_wrapper').css('bottom', position + 5 + 'px');
            }else{
                $('#gun_man_wrapper').removeClass('is_killed_step_1');
                $('#gun_man_wrapper').addClass('is_killed_step_2');
            }
        }
    }else if ($('#gun_man_wrapper').hasClass('is_killed_step_2')){
        if(current_gun_man == 2 || current_gun_man == 3) {
            setTimeout('delete_gunman_styles()',7000);
            setTimeout('play_round()',7000);
            return true;
        }
        if($('#gun_man_wrapper').hasClass('move_down')){
            if(position == 175){
                $('#gun_man_wrapper').removeClass('move_down');
                    $('#gun_man_wrapper').addClass('move_up_15');
            }else{
                $('#gun_man_wrapper').css('bottom', position-5+'px');
            }
        } else if($('#gun_man_wrapper').hasClass('move_up_15')){
            if(position == 175 + 15){
                $('#gun_man_wrapper').removeClass('move_up_15');
                $('#gun_man_wrapper').addClass('move_down_15');
            }else{
                $('#gun_man_wrapper').css('bottom', position+5+'px');
            }
        }else if($('#gun_man_wrapper').hasClass('move_down_15')){
            if(position == 175){
                $('#gun_man_wrapper').removeClass('move_down_15');
                $('#gun_man_wrapper').addClass('move_up_10');
            }else{
                $('#gun_man_wrapper').css('bottom', position-5+'px');
            }
        }
        else if($('#gun_man_wrapper').hasClass('move_up_10')){
            if(position == 175+10){
                $('#gun_man_wrapper').removeClass('move_up_10');
                $('#gun_man_wrapper').addClass('move_down_10');
            }else{
                $('#gun_man_wrapper').css('bottom', position+5+'px');
            }
        }
        else if($('#gun_man_wrapper').hasClass('move_down_10')){
            if(position == 175){
                $('#gun_man_wrapper').removeClass('move_down_10');
                setTimeout('delete_gunman_styles()',7000);
                setTimeout('play_round()',7000);
                return true;
            }else{
                $('#gun_man_wrapper').css('bottom', position-5+'px');
            }
        }

    }
    else{
        $('#gun_man_wrapper').addClass('is_killed_step_1');
    }
    setTimeout('show_dead_gunman()',50);
}

function game_over() {
    $('#life').text('');
    $('#won').text('');
    $('#score').text('00000');
    if(!$('#user_time_left').hasClass('hidden')){
        $('#user_time_left').addClass('hidden');
    }
    if(!$('#user_time_right').hasClass('hidden')){
        $('#user_time_right').addClass('hidden');
    }
    if(!$('#gunman_time_left').hasClass('hidden')){
        $('#gunman_time_left').addClass('hidden');
    }
    if(!$('#gunman_time_right').hasClass('hidden')){
        $('#gunman_time_right').addClass('hidden');
    }
    if(!$('.points_left').hasClass('hidden')){
        $('.points_left').addClass('hidden');
    }
    if(!$('.points_right').hasClass('hidden')){
        $('.points_right').addClass('hidden');
    }
    $('.mark_left').each(function () {
        if(!$(this).hasClass('hidden')){
            $(this).addClass('hidden');
        }
    });
    $('.mark_right').each(function () {
        if(!$(this).hasClass('hidden')){
            $(this).addClass('hidden');
        }
    });
    $('#play-button').css('display','block')
}


function build_gun_man(){
    side = getRandomSide();
    $('#gun_man_wrapper').css(side,zero_position);

    if(current_gun_man == 1){
        if(side == 'left'){
            transform_first_gunman('scaleX(-1)');
        }
    }
    if(prev_gun_men != 0){
        $('#gun_man_wrapper').removeClass('gun_man_' + prev_gun_men);
        if($('#hat').hasClass('h_gun_man_' + prev_gun_men)){
            $('#hat').removeAttr( 'style');
            $('#hat').removeClass('h_gun_man_' + prev_gun_men);
            $('#hat').css('dispay','none');
        }
    }

    $('#gun_man_wrapper').addClass('gun_man_' + current_gun_man);
    prev_gun_men = current_gun_man;
    return true;
}

function transform_first_gunman(transform_value){
    $('#gun_man_wrapper').css('transform',transform_value);
    return true;
}

function move () {
    if(!running){
        return false;
    }
    var gun_man = $('#gun_man_wrapper');
    steps();
    var position = parseInt(gun_man.css(side).replace("px", ""));
    if(position >= 425) {
        prepare_to_fire();
        return false
    }
    gun_man.css(side,position+5+'px')
    setTimeout("move()",100);
    return true
}

function steps(){
    if($('#gun_man_wrapper').hasClass('step_1')){
        $('#gun_man_wrapper').removeClass('step_1');//delete step_1
        $('#gun_man_wrapper').addClass('step_2');//add step_2
    }else if($('#gun_man_wrapper').hasClass('step_2')){
        $('#gun_man_wrapper').removeClass('step_2');//delete step_2
        $('#gun_man_wrapper').addClass('step_3');//add step_3
    }else {
        $('#gun_man_wrapper').removeClass('step_3');//delete step_3
        $('#gun_man_wrapper').addClass('step_1');//add step_1
    }
    return true;
}

function prepare_to_fire (){
    play_next_sound('wait.m4a', true);
    add_fire_class();
    setTimeout('fire()',2000);
}

function add_fire_class(){
    if($('#gun_man_wrapper').hasClass('step_1')){
        $('#gun_man_wrapper').removeClass('step_1');//delete step_1
    }else if($('#gun_man_wrapper').hasClass('step_2')){
        $('#gun_man_wrapper').removeClass('step_2');//delete step_2
    }else {
        $('#gun_man_wrapper').removeClass('step_3');//delete step_3
    }
    $('#gun_man_wrapper').addClass('fire');
}

function fire () {
    if(user_did_shoot == true){
        return false;
    }
    display_fire();
    user_can_shoot = true;
    setTimeout(function () {
        $('#gun_man_wrapper').removeClass('fire_eye');
        hide_notification();
        $('#gun_man_wrapper').addClass('fire_step_1');
    },500);
    user_timer();
}

function blink_user_shoot_time() {
    if(blink == 15){
        if ($('#user_time_' + side + ' .time').hasClass('hidden')) {
            $('#user_time_' + side + ' .time').removeClass('hidden');
        }
        return true;
    }
    if (!$('#user_time_' + side + ' .time').hasClass('hidden')) {
        $('#user_time_' + side + ' .time').addClass('hidden');
    }else{
        $('#user_time_' + side + ' .time').removeClass('hidden');
    }
    blink++;
    setTimeout('blink_user_shoot_time()',200);
}

function user_timer(){
    if (timer_millisec>=99){
        timer_millisec=0
        timer_seconds+=1
    }
    else
        timer_millisec+=1
    if(user_did_shoot){
        return true;
    }
    if(timer_seconds*1000+timer_millisec*10 > gunman_time){
        play_sound('death.m4a');
        $('#user_time_'+side+' .time').text('over');
        $('#gun_man_wrapper').removeClass('fire_step_1');
        $('#gun_man_wrapper').addClass('fire_step_2');
        $('.looser_background').removeClass('hidden');
        $('#notifications').removeAttr('style');
        $('#notifications').addClass('you_lost');
        $('#notifications').addClass(side);
        $('#notifications.you_lost.'+side+' span').text('You Lost !!');
        $('#notifications').css('display','block');
        setTimeout(function () {
            gun_man_shoot_face(0);
        },200);
        setTimeout(function () {
            $('#notifications').removeAttr('style');
            $('#notifications').removeClass('you_lost');
            $('#notifications').removeClass(side);
            if(current_gun_man == 1){
                if(side == 'left'){
                    transform_first_gunman('scaleX(1)');
                }else{
                    transform_first_gunman('scaleX(-1)');
                }
            }
            go_out();
        },4000);
        return false;
    }
    $('#user_time_'+side+' .time').text(humanize_time());
    setTimeout("user_timer()",15);
}

function gun_man_shoot_face(i){
    i = i || 0;
    if(i == 5){
        if($('#gun_man_wrapper').hasClass('fire_step_2')){
            $('#gun_man_wrapper').removeClass('fire_step_2');
        }
        if($('#gun_man_wrapper').hasClass('fire_step_3')){
            $('#gun_man_wrapper').removeClass('fire_step_3');
        }
        $('#gun_man_wrapper').addClass('fire_hide_gun');
        setTimeout(function () {
            $('#gun_man_wrapper').removeClass('fire_hide_gun');
            $('#gun_man_wrapper').addClass('fire');
        },200);
        return true;
    }
    if($('#gun_man_wrapper').hasClass('fire_step_2')){
        $('#gun_man_wrapper').removeClass('fire_step_2');
        $('#gun_man_wrapper').addClass('fire_step_3');
    }else {
        $('#gun_man_wrapper').removeClass('fire_step_3');
        $('#gun_man_wrapper').addClass('fire_step_2');
    }

    setTimeout(function () {
        gun_man_shoot_face(i);
    },200,i++);
}

function humanize_time(){
    return timer_seconds + "." + timer_millisec;
}

function go_out(){
    if($('#gun_man_wrapper').hasClass('fire')) {
        $('#gun_man_wrapper').removeClass('fire');
    }
    var gun_man = $('#gun_man_wrapper');
    steps();
    var position = parseInt(gun_man.css(side).replace("px", ""));
    if(position <= zero_position_number) {
        you_lost();
        running = true;
        user_did_shoot = false;
        $('.looser_background').addClass('hidden');
        play_round();
        return false
    }
    gun_man.css(side,position-5+'px')
    setTimeout("go_out()",100);
    return true
}

function you_lost() {
    user_life -=1;
    delete_gunman_styles();
}

function delete_gunman_styles(){
    $('#gun_man_wrapper').removeAttr( 'style' );
    $('#gun_man_wrapper').css('display','none');
    $('#gun_man_wrapper').removeClass('fire');
    $('#gun_man_wrapper').removeClass('step1');
    $('#gun_man_wrapper').removeClass('step2');
    $('#gun_man_wrapper').removeClass('step3');
    $('#gun_man_wrapper').removeClass('is_killed_step_2');
    $('#gun_man_wrapper').removeClass('is_killed_step_2');
    $('#gun_man_wrapper').removeClass('gun_man_' + current_gun_man);
}

function getRandomInt(min, max) {
    var gun_man =  Math.floor(Math.random() * (max - min + 1)) + min;
    if(prev_gun_men == gun_man){
        return getRandomInt(min, max)
    }
    return gun_man
}

function getRandomSide(){
    if((Math.floor(Math.random() * (2 - 1 + 1)) + 1) == 1){
        return 'left';
    }
    return 'right';
}

function display_shoot_time(){
    var elements = [
        '#user_time_',
        '#gunman_time_',
        '.mark_',
        '.points_'
    ];
    if(side == 'left'){
        var show = 'left';
        var hide = 'right';
    }else{
        var show = 'right';
        var hide = 'left';
    }
    $('#user_time_'+side+' .time').text('0.0');
    var seconds = gunman_time/1000;
    $('#gunman_time_'+side).text(seconds.toFixed(2));
    $('.points_'+side + ' .reward_value').text(get_round_reward());
    elements.forEach(function(item) {
          if($(item+show).hasClass('hidden')){
              $(item+show).removeClass('hidden');
          }
          if(!$(item+hide).hasClass('hidden')){
              $(item+hide).addClass('hidden');
          }
    },show,hide);
}

function fire_foul(){
    play_sound('foul.m4a');
    running = false;
    add_fire_class();
    display_fire_foul();
    $('.looser_background').removeClass('hidden');
    setTimeout('hide_notification()',1500);
    if(current_gun_man == 1){
        if(side == 'left'){
            transform_first_gunman('scaleX(1)');
        }else{
            transform_first_gunman('scaleX(-1)');
        }
    }
    setTimeout('go_out()',2000);

    return true;
}
function display_fire(){
    play_next_sound('fire.m4a');
    display_fire_or_fire_foul_notification('Fire !!');
    $('#gun_man_wrapper').removeClass('fire');
    $('#gun_man_wrapper').addClass('fire_eye');
}

function display_fire_foul(){
    display_fire_or_fire_foul_notification('Foul !!');
}

function display_fire_or_fire_foul_notification(message){
    $('#notifications').removeAttr('style');
    $('#notifications').addClass('fire_foul');
    $('#notifications').addClass(side);
    $('#notifications.fire_foul.'+side+' span').text(message);
    var position = parseInt($('#gun_man_wrapper').css(side).replace("px", ""));
    position = position -  parseInt($('#gun_man_wrapper').css('width').replace("px", ""));
    if(position < 0){
        position = 0;
    }
    $('#notifications').css(side,position+'px');
    $('#notifications').css('display','block');
}

function display_you_won(){
    play_sound('win.m4a');
    if($('#notifications').hasClass('fire_foul')) {
        $('#notifications').removeClass('fire_foul');
    }
    $('#notifications').addClass('you_won');
    $('#notifications').addClass(side);
    $('#notifications.you_won.'+side+' span').text('You won !!');
    $('#notifications').css('display','block');
}

function hide_notification(){
    if($('#notifications').hasClass('fire_foul')) {
        $('#notifications').css('display', 'none');
        $('#notifications').removeClass('fire_foul');
        $('#notifications').removeClass(side);
        $('#notifications').removeAttr('style');
    }
    return true;
}

function get_gunman_round_time(){
    if(round == 1){
      return gunman_time = 1300;
    }
    if(gunman_time <= 100){
        return gunman_time = 400;
    }
    if(gunman_time <= 200){
      return  gunman_time;
    }
    if(gunman_time <= 700){
        return gunman_time -=100;
    }
    return gunman_time -=200;
}

function get_round_reward(){
    return gun_man_reward+round*400;
}

function formating_score(num) {
    var s = "000000000" + num;
    if(5 < num.toString().length){
        return num;
    }
    return s.substr(s.length-5);
}