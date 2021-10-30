let countSpan = document.querySelector(".count span");
let bulletsSpan = document.querySelector(".bullets .spans");
let quizarea = document.querySelector(".qiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bull = document.querySelector(".bullets");
let results = document.querySelector(".results");
let countdown = document.querySelector(".countdown");
let countArea = document.getElementById("countArea")
let currentIndex = 0;
let rightAnswer = 0;
let countDownInterval;
function getQuestion() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionObjects = JSON.parse(this.responseText);
            let questionCount = questionObjects.length;
            //console.log(questionCount);
            creatBullets(questionCount);
            addQuiz(questionObjects[currentIndex], questionCount);
            countDown(9, questionCount);
            submitButton.onclick = () => {
                let theRightAnswer = questionObjects[currentIndex].right_answer;
                // console.log(theRightAnswer)
                currentIndex++;
                document.getElementById("countArea").innerHTML = currentIndex;
                checkAnswer(theRightAnswer, questionCount);
                quizarea.innerHTML = "";
                answersArea.innerHTML = "";
                addQuiz(questionObjects[currentIndex], questionCount);
                handBullets();
                clearInterval(countDownInterval);
                showResult(questionCount);
            }
        }
    }
    myRequest.open("GET", "Quiez.json", true);
    myRequest.send();
}
getQuestion();

function creatBullets(e) {
    countSpan.innerHTML = e;
    for (let i = 0; i <= e; i++) {
        let bullet = document.createElement("span");
        if (i == 0) {
            bullet.className = "on";
        }
        bulletsSpan.appendChild(bullet);
    }
}

function addQuiz(obj, count) {
    if (currentIndex < count) {
        let qTitle = document.createElement("h1");
        let qText = document.createTextNode(obj.title);
        qTitle.appendChild(qText);
        quizarea.appendChild(qTitle);

        for (let i = 1; i <= 4; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className = 'answer';
            let radioInput = document.createElement("input");
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer-${i}`;
            radioInput.dataset.answer = obj[`answer-${i}`];

            let theLabel = document.createElement("label");
            theLabel.htmlFor = `answer-${i}`
            let theLabelText = document.createTextNode(obj[`answer-${i}`]);
            theLabel.appendChild(theLabelText);
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);
            answersArea.appendChild(mainDiv);
        }
    }
}
function checkAnswer(a, c) {
    let answers = document.getElementsByName("question");
    let chooseA;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            chooseA = answers[i].dataset.answer;
        }
    }

    if (a === chooseA) {
        rightAnswer++;
    }

}

function handBullets() {
    bulletSpan = document.querySelectorAll(".bullets .spans span");
    let arr = Array.from(bulletSpan);
    arr.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    })
}

function showResult(count) {
    let result;
    if (currentIndex === count) {
        // console.log("finish")
        quizarea.remove();
        answersArea.remove();
        submitButton.remove();
        bull.remove();

        if (rightAnswer > (count / 3) && rightAnswer < count) {
            theResult = `
            <h4 class="text text-center pt-2 pb-4">إليكِ معلومات الطقس في منطقتك والتي لها تأثير سلبي على بشرتك</h4>

                <p class="pt-3"  style="color: #363873 ;">درجة الحرارة <span class="float-right">30</span></p>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: 60%;" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <p class="pt-3" style="color: #363873 ;">الرطوبة <span class="float-right">متوسطه</span></p>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <p class="pt-3" style="color: #363873 ;">درجة التلوث <span class="float-right">عاليه</span></p>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: 70%;" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <p class="pt-3" style="color: #363873 ;"> الأشعة فوق البنفسجية <span class="float-right">عاليه</span></p>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar" role="progressbar" style="width: 90%;" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div  style="text-align:center; margin:auto" >
              <a href="takePhoto.html"> <button class="btn submit-button btnstyle arrow submit" style="border-radius: 50%; text-align:center; margin:auto ; margin-top: 30px;">
                    <i class="fas fa-arrow-right"></i>
                </button></a>
                </div>`
        }
        results.innerHTML = theResult;
    }
}

function countDown(duration, count) {
    if (currentIndex < count) {
        countDownInterval = setInterval(function () {
            if (--duration < 0) {
                clearInterval(countDownInterval);
                submitButton.click();
            }

        }, 9000);
    }
}


/**********************************************/
/* take Photo */
$('.imgItem').click(function (event) {
    let imgSrc = $(e.target).attr('src');



})


$("#uploadImage").change(function (event) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {

            $("#photo").attr('src', e.target.result)
        });

        FR.readAsDataURL(event.target.files[0]);
    }
})



/* take photo*/
function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    // access video stream from webcam
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
        // on success, stream it in video tag
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);

    clearphoto();
}

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}

/***/
/* JS comes here */
(function () {

    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

          video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }


    function clearphoto() {
        var context = canvas.getContext('');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();



$('.click').click(function () {
    $("#video").css("display", "block")
})
