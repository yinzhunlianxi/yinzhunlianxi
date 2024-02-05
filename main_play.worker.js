const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];
const effects_name = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
const colors = ['rgb(0,0,0)', 'rgb(146,0,13)', 'rgb(248,15,28)', 'rgb(255,131,33)', 'rgb(20,188,79)', 'rgb(0,164,255)', 'rgb(174,69,179)', 'rgb(146,208,80)'];

// worker.js
self.addEventListener('message', function (e) {
    // 在这里处理主线程发送的消息并执行计算逻辑
    const data = e.data;
    console.log('a1111111f')
    const result = doHeavyComputation(data);
    console.log('asdaf')
    self.postMessage(result);
});


function doHeavyComputation(data) {
    // 执行计算密集型任务
    // 返回结果
    console.log('123123')
    for (; ;) {
        play_loop()
        return data
    }

}


function set_note_position(x, y) {
    self.postMessage({ action: 'set_note_position', x: x, y: y });
}

function play_effect(index) {
    self.postMessage({ action: 'play_effect', index:index });
}



function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


async function display_do_to_do() {

    const noteDiv = document.getElementById('note');
    const notepad = document.getElementById('notepad');
    for (let index = 0; index < notes.length; index++) {

        play_effect(index);
        noteDiv.innerHTML = notes[index];
        noteDiv.style.opacity = 1;
        noteDiv.style.color = colors[index];


        let xPosition = (notepad.clientWidth) * (index / (notes.length));
        let yPosition = (notepad.clientHeight) * (1 - index / (notes.length)) - noteDiv.clientHeight;
        set_note_position(xPosition, yPosition)

        if (index != notes.length - 1)
            await sleep(300)
    }
}

async function play_loop() {
    const noteDiv = document.getElementById('note');
    const notepad = document.getElementById('notepad');


    //播放do re mi fa so la xi do
    await display_do_to_do();


    var intr = 500;




    await sleep(intr)

    //--------- 把音符移动到中间，并且把播放do ------------
    play_effect(0);
    noteDiv.style.color = colors[0];
    let xPosition = (notepad.clientWidth - noteDiv.clientWidth) / 2;
    let yPosition = (notepad.clientHeight - noteDiv.clientHeight) / 2;
    set_note_position(xPosition, yPosition)
    await sleep(intr)

    //在播放两次do之间，黑屏闪烁一下
    let origin_background = notepad.style.background
    notepad.style.background = 'black'
    await sleep(500);//等待一段时间后恢复背景颜色
    notepad.style.background = origin_background

    play_effect(0);

    await sleep(intr)


    //--------- 随机播放音符 ------------
    var rand_id = Math.floor(Math.random() * notes.length);

    await sleep(intr)

    noteDiv.innerHTML = '?';
    noteDiv.style.color = 'white';
    origin_background = notepad.style.background
    notepad.style.background = 'black'
    play_effect(rand_id);

    await sleep(3000)

    notepad.style.background = origin_background


    noteDiv.style.color = colors[rand_id];
    noteDiv.innerHTML = notes[rand_id];
    play_effect(rand_id);

    await sleep(intr)


    await sleep(3000)
}
