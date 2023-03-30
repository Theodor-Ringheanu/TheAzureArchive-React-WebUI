import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function AddNews() {
    window.scrollTo(0, 0);
    const newsSource = useRef("");
    const newsTitle = useRef("");
    const newsAuthor = useRef("");
    const newsPublicationDate = useRef("");
    const newsImageUrl = useRef("");
    const newsContent = useRef("");

    const navigate = useNavigate();

    const [sourceError, setSourceError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    function AddNewsHandler() {
        if (newsSource.current.value.length >= 250) {
            setSourceError(true);
            return;
        }
        if (newsTitle.current.value.length < 2 ||newsTitle.current.value.length >= 250) {
            setTitleError(true);
            return;
        }
        if (newsAuthor.current.value.length >= 250) {
            setAuthorError(true);
            return;
        }
        if (!validateDate(newsPublicationDate.current.value)) {
            setDateError(true);
            return;
        }
        if (newsImageUrl.current.value.length < 2 || newsImageUrl.current.value.length >= 250) {
            setImageUrlError(true);
            return;
        }
        if (newsContent.current.value.length < 2) {
            setContentError(true);
            return;
        }
        const payload = {
            source: newsSource.current.value,
            title: newsTitle.current.value,
            author: newsAuthor.current.value,
            publicationDate: newsPublicationDate.current.value,
            imageUrl: newsImageUrl.current.value,
            content:newsContent.current.value
        };

        axios
            .post("https://localhost:7080/api/News", payload)
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    return (
        <>
            <h1>Create News</h1>
            <Form>
                <Form.Group className="form-box">

                <Form.Group className="label-1" controlId="formNewsSource">
                        <Form.Label>Source</Form.Label>
                        {sourceError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid source.
                            </div>}
                        <Form.Control type="text" placeholder="Source" ref={newsSource} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsTitle">
                        <Form.Label>Title</Form.Label>
                        {titleError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid title.
                            </div>}
                        <Form.Control type="text" placeholder="Title" ref={newsTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder="Author" ref={newsAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsPublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder="YYYY-MM-DD" ref={newsPublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The news needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder="https://www.example.com" ref={newsImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's an news after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder="Lorem ipsum..."
                            ref={newsContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={AddNewsHandler}>
                        PUBLISH NEWS
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default AddNews;
