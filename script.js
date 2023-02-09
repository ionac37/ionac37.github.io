const questionPageHelpButton = document.getElementById("questionHelpButton")
const closeHelpButton = document.getElementById("closeHelpButton")
const nextQuestionButton = document.getElementById('nextQuestion')
const nextAnswerButton = document.getElementById('nextAnswer')
const question = document.getElementById('question')
const questionHead = document.getElementById('questionHead')
const answers = document.getElementById('checks')
const finishButton = document.getElementById('finishButton')
const markButton = document.getElementById('markButton')
const revealButton = document.getElementById('revealButton')
const zoomButton = document.getElementById("zoomInButton")
const zoomOutButton = document.getElementById("zoomOutButton")
const bigImage = document.getElementById("mydiv")

let currentQuestion = 0
let currentAnswer = 0

nextQuestionButton.addEventListener('click', nextQuestion)
nextAnswerButton.addEventListener('click', nextAnswer)
markButton.addEventListener('click', markAnswer)
revealButton.addEventListener('click', revealAnswer)
zoomButton.addEventListener('click', zoom)
zoomOutButton.addEventListener('click', zoomOut)

function zoom() {
    bigImage.classList.remove('hide')
}

function zoomOut() {
    bigImage.classList.add('hide')
}

function nextQuestion() {
    currentQuestion++
    question.innerText = questions[currentQuestion].question
    questionHead.innerText = questions[currentQuestion].number
    getNextCheckOptions()
    currentAnswer = -1
    nextAnswer()
}

function getNextCheckOptions() {
    markButton.classList.remove('hide')
    currentCheckOptions = questions[currentQuestion].checkOptions
    for (let i=0; i<currentCheckOptions.length; i++) {
        option = currentCheckOptions[i]
        document.getElementById('checkbox'+option.id).classList.remove('hide')
        document.getElementById('box'+option.id).checked = false
        document.getElementById('label'+option.id).classList.remove('correctAnswer')
        document.getElementById('label'+option.id).classList.remove('incorrectAnswer')
        currentCheck = document.getElementById("label"+option.id)
        currentCheck.innerText = option.text
    }
    for (let i=currentCheckOptions.length+1; i<41; i++) {
        document.getElementById('checkbox'+i).classList.add('hide')
    }
}

function revealAnswer() {
    document.getElementById('checkContainer').classList.add('markedCorrect')
    currentCheckOptions = questions[currentQuestion].checkOptions
    correctAnswers = questions[currentQuestion].answers[currentAnswer].correct
    for (let i=1; i<41; i++) {
        if (document.getElementById('checkbox'+i).classList.contains('hide')) {
            break
        } else if (correctAnswers.includes(i)) {
            document.getElementById('label'+i).classList.add('correctAnswer')
            document.getElementById('box'+i).checked = true
        } else {
            document.getElementById('label'+i).classList.remove('incorrectAnswer')
            document.getElementById('box'+i).checked = false
        }
    }
    markButton.classList.add('hide')
    revealButton.classList.add('hide')
}

function nextAnswer() {
    currentAnswer++
    document.getElementById('checkContainer').classList.remove('allCorrect')
    document.getElementById('checkContainer').classList.remove('markedCorrect')
    getNextCheckOptions()
    if (currentAnswer > questions[currentQuestion].answers.length-1) {
        nextAnswerButton.classList.add('hide')
    }
    document.getElementById('answerImage').src = questions[currentQuestion].answers[currentAnswer].image
    document.getElementById('modalImage').src = questions[currentQuestion].answers[currentAnswer].image
    revealButton.classList.add('hide')
    nextAnswerButton.classList.add('hide')
    nextQuestionButton.classList.add('hide')
}

function markAnswer() {
    let noneChecked = true
    let correctAnswersOnly = true
    correctAnswers = questions[currentQuestion].answers[currentAnswer].correct
    selectedAnswers = []
    for (let i=1; i<41; i++) {
        if (document.getElementById('checkbox'+i).classList.contains('hide')) {
            break
        }
        if (document.getElementById('box'+i).checked) {
            noneChecked = false
            selectedAnswers.push(i)
            if (correctAnswers.includes(i)) {
                document.getElementById('label'+i).classList.add('correctAnswer')
            } else {
                document.getElementById('label'+i).classList.add('incorrectAnswer')
                correctAnswersOnly = false
            }
        }
    }
    if (!noneChecked) {
        document.getElementById('noAnswer').classList.add('hide')
        let rightAnswers = false
        if (selectedAnswers.sort().join(',')=== correctAnswers.sort().join(',')){
            rightAnswers = true
        }
        revealButton.classList.remove('hide')  
        if (correctAnswersOnly & rightAnswers) {
            document.getElementById('checkContainer').classList.add('allCorrect')
            markButton.classList.add('hide')
            revealButton.classList.add('hide')
            for (let i=0; i<selectedAnswers.length;i++) {
                document.getElementById('label'+selectedAnswers[i]).classList.remove('correctAnswer')
            }
        }  
        if (currentQuestion <= questions.length-2) {
            nextQuestionButton.classList.remove('hide')
            finishButton.classList.add('hide')
        }
        if (currentAnswer < questions[currentQuestion].answers.length-1) {
            nextAnswerButton.classList.remove('hide')
        }
        if (currentQuestion > questions.length-2) {
            nextQuestionButton.classList.add('hide')
            finishButton.classList.remove('hide')
        }
    } else {
        document.getElementById('noAnswer').classList.remove('hide')
    }
}


// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// https://www.w3schools.com/howto/howto_js_draggable.asp



const questions = [
    {
        number: 'Question A1',
        question: 'In LucidChart draw a UML class diagram showing: \n(a) a class Participant with a private attribute name of type String and a public operation join taking a VideoCall as argument and returning a boolean \n(b) an abstract class VideoCall \n(c) concrete subclasses ZoomCall and TeamsCall of VideoCall \n(d) an appropriate relationship between VideoCall, ZoomCall and TeamsCall \n(e) an appropriate relationship between Participant and VideoCall, demonstrating that at any one time a given participant can be in at most one video call, while a video call may have any number of participants (including zero, say, to account for scheduled calls).\n\n',
        answers: [
            { image: '/2021/StudentA/done/A1.JPG', correct: [4, 9] },
            { image: '/2021/StudentB/done/A1.JPG', correct: [5, 4, 9] },
            { image: '/2021/StudentC/done/A1.JPG', correct: [1] },
            { image: '/2021/StudentD/done/A1.JPG', correct: [3, 4, 6] },
            { image: '/2021/StudentE/done/A1.JPG', correct: [4, 9] },
            { image: '/2021/StudentF/done/A1.JPG', correct: [9] },
            { image: '/2021/StudentG/done/A1.JPG', correct: [3, 9] },
            { image: '/2021/StudentH/done/A1.JPG', correct: [2, 4, 9] },
            { image: '/2021/StudentI/done/A1.JPG', correct: [2, 9] },
            { image: '/2021/StudentJ/done/A1.JPG', correct: [4, 9] },
            { image: '/2021/StudentK/done/A1.JPG', correct: [4, 9] },
            { image: '/2021/StudentL/done/A1.JPG', correct: [9] },
            { image: '/2021/StudentM/done/A1.JPG', correct: [4, 9] },
            { image: '/2021/StudentN/done/A1.JPG', correct: [7, 8, 9] },
            { image: '/2021/StudentO/done/A1.JPG', correct: [9] },
            { image: '/2021/StudentP/done/A1.JPG', correct: [9] },
            { image: '/2021/StudentQ/done/A1.JPG', correct: [4, 8, 9] },
            { image: '/2021/StudentR/done/A1.JPG', correct: [4, 9] }
        ],
        checkOptions: [
            { id: '1', text: "Perfect!"},
            { id: '2', text: "You need a Generalization, shown with an unfilled triangle head, between ZoomCall, TeamsCall and VideoCall. If you use a -> head you are showing a navigable Association which is a completely different thing."},
            { id: '3', text: "You're showing interface realization with the dashed line, not generalization - given that VideoCall is an abstract class not an interface the latter is what you need."},
            { id: '4', text: "At the VideoCall end of the association with Participant, you need multiplicity 0..1, because the question said that a participant could be in at most one video call."},
            { id: '5', text: "You're showing a dependency between Participant and VideoCall not an Association. Now there always is a dependency when there's an association - but dependency is not an instance-level concept so it doesn't then make sense to put multiplicities on a dependency arrow."},
            { id: '6', text: "You do not have information about navigability, so probably better not to show any."},
            { id: '7', text: "ZoomCall and TeamsCall should not be abstract, only VideoCall."},
            { id: '8', text: "It is arguable, but I don't think an aggregation between Participant and VideoCall is really appropriate. A Participant is not really a *part* of a VideoCall, even though we use the phrase \"to take part in\"."},
            { id: '9', text: "Really you should name the association (or alternatively the association ends)."}
        ]
    },
    {
        number: 'Question A2',
        question: 'Using SequenceDiagram.org, draw a sequence diagram showing lifelines for an actor called s of type Scheduler and for two Participants called p1 and p2. Show that s creates a ZoomCall and then causes first p1 and then p2 to join it: show that they do so successfully. \nYour diagram should illustrate just the example behaviour described: do not use fragments, do not concern yourself with error behaviour. There is no need to show activation bars.\n\n',
        answers: [
            { image: '/2021/StudentA/done/A2.png', correct: [8, 9, 12] },
            { image: '/2021/StudentB/done/A2.png', correct: [2, 6, 8, 10, 9, 15] },
            { image: '/2021/StudentC/done/A2.png', correct: [8, 13] },
            { image: '/2021/StudentD/done/A2.png', correct: [8] },
            { image: '/2021/StudentE/done/A2.png', correct: [1] },
            { image: '/2021/StudentF/done/A2.png', correct: [1] },
            { image: '/2021/StudentG/done/A2.png', correct: [9, 19] },
            { image: '/2021/StudentH/done/A2.png', correct: [3, 8, 10] },
            { image: '/2021/StudentI/done/A2.png', correct: [2, 5, 8, 11, 10, 14] },
            { image: '/2021/StudentJ/done/A2.png', correct: [8] },
            { image: '/2021/StudentK/done/A2.png', correct: [8, 4, 20] },
            { image: '/2021/StudentL/done/A2.png', correct: [7, 8, 10, 16] },
            { image: '/2021/StudentM/done/A2.png', correct: [14, 17] },
            { image: '/2021/StudentN/done/A2.png', correct: [8] },
            { image: '/2021/StudentO/done/A2.png', correct: [1] },
            { image: '/2021/StudentP/done/A2.png', correct: [8] },
            { image: '/2021/StudentQ/done/A2.png', correct: [8, 18] },
            { image: '/2021/StudentR/done/A2.png', correct: [8, 14] }
        ],
        checkOptions: [
            { id: '1', text: "Perfect!"},
            { id: '2', text: "Missing types in lifelines: you need e.g. p1:Participant"},
            { id: '3', text: "The instance of scheduler was supposed to be an actor, so show it as such with a stick figure."},
            { id: '4', text: "Only the scheduler is an actor."},
            { id: '5', text: "Use ordinary rectangular instances unless told otherwise - the robustness diagram symbols are not standard in UML."},
            { id: '6', text: "You create an instance of ZoomCall so show the lifeline as an instance."},
            { id: '7', text: "ZoomCall is a class name not an instance name!"},
            { id: '8', text: "Object creation not shown correctly."},
            { id: '9', text: "The source of both join messages should be the scheduler."},
            { id: '10', text: "Use the join method that you already know about from A1."},
            { id: '11', text: "It is the scheduler, not the call, that has to send messages to the participants."},
            { id: '12', text: "join is a method on Participant, not ZoomCall: your message is going in the wrong direction."},
            { id: '13', text: "Don't write p1.join etc. - the diagram already shows that the message is going to p1."},
            { id: '14', text: "Don't forget the argument to join: you must pass the very same ZoomCall object that you just created."},
            { id: '15', text: "Use the solid arrow head for synchronous messages."},
            { id: '16', text: "Why would a message ever have its own recipient as an argument?"},
            { id: '17', text: "Don't destroy the ZoomCall - you were not told to. NB a <<create>> is special - you do not need to show a reply to it."},
            { id: '18', text: "You've invented the connect message, though it's quite a reasonable thing to invent."},
            { id: '19', text: "Check the notation for return arrows."},
            { id: '20', text: "You've invented the enterCall message, though it's quite a reasonable thing to invent."}
        ]
    },
    {
        number: 'Question B1',
        question: 'This multi-part question produces a single LucidChart diagram. \nNote: you will probably need to enrich the sets of attributes and operations of the Participant class slightly. Do not modify the class diagram you drew earlier. Instead, include in your diagram (e.g. as a Note, a UML comment) a list of any extra attributes and operations you need to add. Only add things you need in order to answer this question. \n1. In LucidChart, draw a nested state diagram for class Participant indicating that a participant can be in a call or not, and that if they are in a call, they may be muted or not. Make the mute setting “sticky” in the sense that if the participant leaves and then joins, they will be muted if and only if they were muted when they left. A newly-created Participant should not be on a call. The default state on entering a call for the first time should be muted. \nInclude events on transitions, but do not include actions.\n\n',
        answers: [
            { image: '/2021/StudentA/done/B.JPG', correct: [2, 5, 14] },
            { image: '/2021/StudentB/done/B.JPG', correct: [6, 15] },
            { image: '/2021/StudentC/done/B.JPG', correct: [5] },
            { image: '/2021/StudentD/done/B.JPG', correct: [5, 7] },
            { image: '/2021/StudentE/done/B.JPG', correct: [9] },
            { image: '/2021/StudentF/done/B.JPG', correct: [1] },
            { image: '/2021/StudentG/done/B.JPG', correct: [7, 8] },
            { image: '/2021/StudentH/done/B.JPG', correct: [15, 13] },
            { image: '/2021/StudentI/done/B.JPG', correct: [1] },
            { image: '/2021/StudentJ/done/B.JPG', correct: [5] },
            { image: '/2021/StudentK/done/B.JPG', correct: [16] },
            { image: '/2021/StudentL/done/B.JPG', correct: [5, 7] },
            { image: '/2021/StudentM/done/B.JPG', correct: [7, 10] },
            { image: '/2021/StudentN/done/B.JPG', correct: [7] },
            { image: '/2021/StudentO/done/B.JPG', correct: [1] },
            { image: '/2021/StudentP/done/B.JPG', correct: [8] },
            { image: '/2021/StudentQ/done/B.JPG', correct: [11, 12] },
            { image: '/2021/StudentR/done/B.JPG', correct: [4, 5, 3] }
        ],
        checkOptions: [
            { id: '1', text: "Good"},
            { id: '2', text: "You need a start pseudostate with a transition into the not in call state."},
            { id: '3', text: "No event is needed on the transition from the start state (this is just object creation)."},
            { id: '4', text: "There wasn't information about a transition to a final state, and it is not obligatory for state diagrams to have such transitions: don't invent."},
            { id: '5', text: "Arrow heads on transitions in state diagrams should be -> not LucidChart's default solid triangle or anything else."},
            { id: '6', text: "Why did you add joinCall when there's already a join??"},
            { id: '7', text: "Be clear that the labels on your transitions are events, in this case, message calls. E.g. use exactly join(v), and where you invent new method names, use consistent capitalisation and make sure what you use on the transitions is exactly consistent with what you have in your class diagram and your note about what else you are adding."},
            { id: '8', text: "I wonder whether you really understand how history states work? You seem to be trying to duplicate its effect."},
            { id: '9', text: "I wonder whether you really understand how history states work? You are circumventing its effect by having your transition into the superstate bypass it."},
            { id: '10', text: "The extra state you have immediately after the start state is redundant - note in particular that it has no event on the transition leading out of it, which is a warning sign. Just leave it out and put the start state transitioning directly into not on a call."},
            { id: '11', text: "Correct but can be done a little more simply, see solution video."},
            { id: '12', text: "NB the videoCall property of Participant already exists - you aren't inventing it!"},
            { id: '13', text: "The state diagram is for Participant, so the call events in it are methods of Participant, not VideoCall."},
            { id: '14', text: "You've added operations not just attributes - and why is leave() in []?"},
            { id: '15', text: "You were told not to add things you didn't need, so you should not add a new attribute to represent whether the participant is in a call: that is already there in the property that is the association end connecting Participant to VideoCall in your class diagram."},
            { id: '16', text: "Show brackets after the message names e.g. join(), as these are call events."}
        ]
    },
    {
        number: 'Question B2',
        question: 'This multi-part question produces a single LucidChart diagram. \nNote: you will probably need to enrich the sets of attributes and operations of the Participant class slightly. Do not modify the class diagram you drew earlier. Instead, include in your diagram (e.g. as a Note, a UML comment) a list of any extra attributes and operations you need to add. Only add things you need in order to answer this question. \n2. In the same diagram, add: \n(a) An OCL constraint, placed in an appropriate state of your diagram, describing what it means that the participant is not in a call. (That is, defining the state in terms of the object’s properties.) \n(b) An OCL guard on the transition corresponding to the participant unmuting, to indicate that they can only do this if no other participant on the same call is unmuted. \nYour constraints may use any relevant properties from your Part A class diagram; if you need to use extra properties, make sure they are included in the Note mentioned above.\n\n',
        answers: [
            { image: '/2021/StudentA/done/B.JPG', correct: [3, 8, 10] },
            { image: '/2021/StudentB/done/B.JPG', correct: [4, 6] },
            { image: '/2021/StudentC/done/B.JPG', correct: [3, 4, 11] },
            { image: '/2021/StudentD/done/B.JPG', correct: [3, 4, 10, 12] },
            { image: '/2021/StudentE/done/B.JPG', correct: [4, 10] },
            { image: '/2021/StudentF/done/B.JPG', correct: [4] },
            { image: '/2021/StudentG/done/B.JPG', correct: [3, 1] },
            { image: '/2021/StudentH/done/B.JPG', correct: [4, 2] },
            { image: '/2021/StudentI/done/B.JPG', correct: [1, 9] },
            { image: '/2021/StudentJ/done/B.JPG', correct: [7, 4, 8] },
            { image: '/2021/StudentK/done/B.JPG', correct: [7, 4, 2] },
            { image: '/2021/StudentL/done/B.JPG', correct: [7, 8] },
            { image: '/2021/StudentM/done/B.JPG', correct: [7, 5, 6, 7] },
            { image: '/2021/StudentN/done/B.JPG', correct: [7, 4, 5, 8] },
            { image: '/2021/StudentO/done/B.JPG', correct: [4, 10, 12] },
            { image: '/2021/StudentP/done/B.JPG', correct: [1, 6] },
            { image: '/2021/StudentQ/done/B.JPG', correct: [3] },
            { image: '/2021/StudentR/done/B.JPG', correct: [1] }
        ],
        checkOptions: [
            { id: '1', text: "OCL: an attempt, but not close enough to correct for marks I'm afraid."},
            { id: '2', text: "Guard: not done"},
            { id: '3', text: "You were told not to add things you didn't need, so you should not add a new attribute to represent whether the participant is in a call: that is already there in the property that is the association end connecting Participant to VideoCall in your class diagram."},
            { id: '4', text: "Note that context Participant inv: is not quite right: this whole state diagram is in the context of Participant (so you can assume that), and you are not defining an invariant of the class which is what inv: means."},
            { id: '5', text: "OCL on the unmuting transition: valiant attempt but not close enough to making sense for marks."},
            { id: '6', text: "You definitely don't want to use Participant.allInstances because that will make the constraint depend on the states of all objects of class Participant, not only those that are on the same call as self!"},
            { id: '7', text: "It isn't the role of a constraint to assign a new value to an attribute."},
            { id: '8', text: "What you want on the transition is a guard in []: check you understand guards on state diagram transitions."},
            { id: '9', text: "Using oclIsInState is a bit circular! What we're trying to do here is \"defining the state in terms of the object's properties\"."},
            { id: '10', text: "Since the whole diagram is about a particular Participant, when you want to talk about a VideoCall you have to specify which one."},
            { id: '11', text: "self.participants doesn't make sense when self is a Participant."},
            { id: '12', text: "Good attempt at the OCL even though it isn't quite right!"}
        ]
    }
]
