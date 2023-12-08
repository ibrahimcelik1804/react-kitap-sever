import { useState } from "react";
import Header from "./Component/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./Component/BookCard/BookCard";
import DeleteModal from "./Component/DeleteModal/DeleteModal";
import EditModal from "./Component/EditModal/EditModal";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [editItem, setEditItem] = useState({});
  const handleChange = (e) => {
    //console.log(e.target.value)
    setBookName(e.target.value);
  };
  //console.log('statedeki kitap:', bookName)
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('form fonksiyon')

    if (!bookName) {
      toast.warn("Lütfen Kitap İsmi Giriniz", { autoClose: 2000 });
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    //console.log("yeni kitap objesi", newBook);
    setBooks([...books, newBook]);

    toast("Kitap Başarıyla Eklendi", { autoClose: 2000 });

    setBookName("");
  };
  //console.log(" kitap dizisi ", books);
  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    //console.log(deleteBookId);
    setShowDeleteModal(true);
  };
  const handleDelete = () => {
    // console.log(handleDelete);
    const filteredBooks = books.filter((book) => book.id !== deleteId);
    //console.log(filteredBooks);

    setBooks(filteredBooks);
    setShowDeleteModal(false);
    toast.error("Kitap Başarıyla Silindi", { autoClose: 2000 });
  };
  const handleEditModal = (editBook) => {
    //console.log("düzenleme modalı");
    setEditItem(editBook);
    setShowEditModal(true);
    //console.log(handleEditModal)
    //console.log(editBook)
  };
  const handleEditBook = () => {
    //console.log('edit fonksiyonu')
    const editIndex = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false);
    toast.success("Kitap Başarılı Bir Şekilde Güncellendi", {
      autoClose: 2000,
    });
  };
  const handleRead = (readBook) => {
    // console.log('read Fonk')
    //console.log(readBook);

    const updatedBook = { ...readBook, isRead: !readBook.isRead };
    //console.log(updatedBook);

    const index = books.findIndex((book) => book.id === readBook.id);

    const cloneBooks = [...books];
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };
  return (
    <div>
      <Header />

      <div className="container">
        <form className="mt-4 d-flex gap-5" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            placeholder="Bir Kitap İsmi Giriniz"
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {books.length === 0 ? (
          <h4>Henüz Herhangi Bir Kitap Eklenmedi</h4>
        ) : (
          books.map((book) => (
            <BookCard
              handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={book.id}
              handleRead={handleRead}
            />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <EditModal
          handleEditBook={handleEditBook}
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}
export default App;
