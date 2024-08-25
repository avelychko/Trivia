  $(document).ready(function() {
    // Initial State
    $("input[type='submit'][name='choice']").prop("disabled", false); //Category buttons
    $("input[type='submit'][name='check-answer']").prop("disabled", true); //Check answer button
    $("input[type='radio'][name='answer']").prop("checked", false); //Radio buttons
    $("input[type='radio'][name='answer']").prop("disabled", true); //Radio buttons
    $("aside ul").empty(); //History

    // Questions
    var questions = {
        "Sova": {
            question: "Is Sova from Poland?",
            answer: "false"
        },
        "Viper": {
            question: "Is Viper's real name Sabine?",
            answer: "true"
        },
        "Brimstone": {
            question: "Was Brimstone the first agent?",
            answer: "true"
        },
        "Killjoy": {
            question: "Is Killjoy a Controller?",
            answer: "false"
        }
    }

    // Picking a Question
    var currentQuestion = null;

    $("input[type='submit'][name='choice']").click(function() {
        var selectedQuestion = $(this).val(); 

        // Check if the user selected another question before answering
        if (currentQuestion !== null && currentQuestion !== selectedQuestion) {
            alert("You must answer the current question.");
        } else {
            currentQuestion = selectedQuestion;
            $(".question-box").text(questions[currentQuestion].question); // Display question

            $(".validation").text(""); //Clear validation text
            $("input[type='radio'][name='answer']").prop("checked", false); //Radio buttons
            $("input[type='radio'][name='answer']").prop("disabled", false); //Radio buttons

            // Check if radio button was selected
            $("input[type='radio'][name='answer']").change(function() {
                if ($("input[type='radio'][name='answer']").is(":checked")) {
                    $("input[type='submit'][name='check-answer']").prop("disabled", false);
                } else {
                    $("input[type='submit'][name='check-answer']").prop("disabled", true);
                }
            });
        }
    });

    // Checking the Answer
    $("input[type='submit'][name='check-answer']").click(function() {
        var userSelection = $("input[type='radio'][name='answer']:checked").val(); //Radio button

        // Checks if answer is correct
        var color = null;
        if (userSelection === questions[currentQuestion].answer) {
            color = "green";
            $(".validation").text("Correct.").css("color", color);
        } else {
            color = "red";
            $(".validation").text("Incorrect.").css("color", color);
        }

        $("input[type='radio'][name='answer']").prop("disabled", true); //Radio buttons
        $("input[type='submit'][name='choice'][value='" + currentQuestion + "']").prop("disabled", true); //Category button
        $("aside ul").append($("<li>").text(currentQuestion).css("color", color)); //History
        $("input[type='submit'][name='check-answer']").prop("disabled", true); //Check answer button

        currentQuestion = null;

        // Game Over
        if (($("aside ul").find("li").length) === 4) {
            $("main").delay(2000).slideUp("slow", function() {
                $("<li>")
                    .text("Game Over!")
                    .css({
                        fontSize: "24px",
                        fontWeight: "bold",
                        textAlign: "center"
                    })
                    .appendTo("ul")
                    .fadeIn("slow")
                    .delay(3000) 
                    .fadeOut("slow", function() {
                        $("main").slideDown("slow");
                    });
            });
        }
    });
});
