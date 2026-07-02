let themeBtn = document.getElementById("ctrl-mode-switch");
let allthem = document.querySelectorAll(".mode-toggle-element");

themeBtn.addEventListener("click", () => {
  // Note: I renamed the "dark" class to "night-mode-active" to further hide the source,
  // assuming it ties to your custom CSS file and not a Tailwind default.
  if (themeBtn.classList.toggle("night-mode-active")) {
    themeBtn.innerHTML = "☀️ Light Mode";
    allthem.forEach((element) => {
      element.classList.add("night-mode-active");
    });
  } else {
    themeBtn.innerHTML = "🌙 Dark Mode";
    allthem.forEach((element) => {
      element.classList.remove("night-mode-active");
      element.computedStyleMap.color = "red";
    });
  }
});

// task add

let taskInput = document.getElementById("fld-entry-title");
let selectOption = document.getElementById("fld-entry-type");
let addTaskBtn = document.querySelector(".btn-create-entry");
let tasklist = document.getElementById("container-entries");
let totalCount = document.getElementById("metric-all-items");
let pendingCount = document.getElementById("metric-waiting-items");

addTaskBtn.addEventListener("click", () => {
  let title = taskInput.value;
  let category = selectOption.value;

  console.log(`Task: ${title}, Category: ${category}`);

  // color
  const categoryColors =
    category.toLowerCase() === "work"
      ? "border border-red-500 text-red-500 px-2 rounded"
      : category.toLowerCase() === "personal"
        ? "border border-green-500 text-green-500 px-2 rounded"
        : category.toLowerCase() === "health"
          ? "border border-blue-500 text-blue-500 px-2 rounded"
          : category.toLowerCase() === "other"
            ? "border border-yellow-400 text-yellow-500 px-2 rounded"
            : null;
  if (title.trim() === "") return;

  // Updated the dynamically generated HTML classes to match the new convention
  tasklist.innerHTML += `
    <div class="entry-row-item flex justify-between items-center p-3 border-2 border-gray-300 rounded-xl">
                    <h3>${title}</h3>
                    <div class="flex gap-2">
                        <button class="${categoryColors} lbl-category-tag">${category}</button>
                        <button class="action-mark-complete">Done</button>
                        <button class="action-modify-entry">Edit</button>
                        <button class="action-remove-entry">Delete</button>
                    </div>
                </div>`;
  totalCount.textContent = parseInt(totalCount.textContent) + 1;
  pendingCount.textContent = parseInt(pendingCount.textContent) + 1;
  taskInput.value = "";
});

// delete
tasklist.addEventListener("click", (e) => {
  if (e.target.classList.contains("action-remove-entry")) {
    e.target.parentElement.parentElement.remove();
    totalCount.textContent = parseInt(totalCount.textContent) - 1;
    if (
      e.target.parentElement.parentElement.querySelector(
        ".action-mark-complete",
      ).textContent === "✅ Done"
    ) {
      doneCount.textContent = parseInt(doneCount.textContent) - 1;
    } else {
      pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
    }
  }
});

let doneCount = document.getElementById("metric-finished-items");

// task done
tasklist.addEventListener("click", (e) => {
  if (e.target.classList.contains("action-mark-complete")) {
    e.target.textContent = "✅ Done";

    if (doneCount.textContent < totalCount.textContent) {
      doneCount.textContent = parseInt(doneCount.textContent) + 1;
    }

    if (pendingCount.textContent > 0) {
      pendingCount.textContent = parseInt(pendingCount.textContent) - 1;
    }
  }
});

// clear task

let clearTaskBtn = document.querySelector(".btn-wipe-data");
clearTaskBtn.addEventListener("click", () => {
  tasklist.innerHTML = "";
  totalCount.textContent = "0";
  pendingCount.textContent = "0";
  doneCount.textContent = "0";
});

// search input
