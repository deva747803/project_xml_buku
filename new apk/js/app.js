const button = document.getElementById("loadBooks");
const bookList = document.getElementById("bookList");

button.addEventListener("click", () => {
    fetch("https://openlibrary.org/subjects/popular.json?limit=30")
        .then(response => response.json())
        .then(data => {
            bookList.innerHTML = "";
            data.works.forEach(book => {
                const card = document.createElement("div");
                card.className = "card";

                const coverUrl = book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : "https://via.placeholder.com/150?text=No+Cover";

                card.innerHTML = `
                    <img src="${coverUrl}" alt="${book.title}">
                    <h2>${book.title}</h2>
                    <p><strong>Penulis:</strong> ${book.authors ? book.authors.map(author => author.name).join(", ") : "Tidak diketahui"}</p>
                    <p><strong>Subjek:</strong> ${book.subject ? book.subject.join(", ") : "Tidak tersedia"}</p>
                `;
                bookList.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
        });
});