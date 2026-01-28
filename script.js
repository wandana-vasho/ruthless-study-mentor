let logs = JSON.parse(localStorage.getItem("studyLogs")) || [];

function submitProgress() {
    const hours = Number(document.getElementById("hours").value);
    const topic = document.getElementById("topic").value.trim();
    const focus = document.getElementById("focus").value;
    const mistakes = document.getElementById("mistakes").value.trim();

    if (!hours || !topic || !focus) {
        showMentor("❌ You skipped important fields. Discipline starts with completeness.");
        return;
    }

    const entry = {
        date: new Date().toLocaleDateString(),
        hours,
        topic,
        focus,
        mistakes
    };

    logs.push(entry);
    localStorage.setItem("studyLogs", JSON.stringify(logs));

    giveRuthlessFeedback(entry);
    updateSummary();
}

function giveRuthlessFeedback(entry) {
    let msg = "";

    if (entry.hours < 2) {
        msg += "🚨 Studying less than 2 hours is not seriousness, it's pretending.\n";
    } else if (entry.hours < 4) {
        msg += "⚠️ Decent, but average students do this. Excellence demands more.\n";
    } else {
        msg += "🔥 Strong effort. Now make it consistent.\n";
    }

    if (entry.focus === "low") {
        msg += "❌ Low focus detected. Remove phone, social media, and excuses.\n";
    } else if (entry.focus === "medium") {
        msg += "⚠️ Medium focus means wasted potential.\n";
    } else {
        msg += "✅ High focus — this is how professionals work.\n";
    }

    if (entry.mistakes.length > 0) {
        msg += "🧠 Good that you identified mistakes. Fix them tomorrow. No repeats.\n";
    } else {
        msg += "⚠️ No mistakes listed. Either you're lying or not analyzing.\n";
    }

    showMentor(msg);
}

function showMentor(text) {
    document.getElementById("mentorMessage").innerText = text;
}

function updateSummary() {
    const totalDays = logs.length;
    const totalHours = logs.reduce((sum, l) => sum + l.hours, 0);
    const avg = (totalHours / totalDays).toFixed(2);

    let verdict = avg < 3
        ? "❌ Your average is weak. Increase daily minimum."
        : "✅ You're moving forward. Now aim higher.";

    document.getElementById("summaryText").innerText =
        `Days tracked: ${totalDays}\nAverage hours/day: ${avg}\n${verdict}`;
}
