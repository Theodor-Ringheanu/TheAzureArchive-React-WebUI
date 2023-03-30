import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function EditNews() {
    const newsSource = useRef("");
    const newsTitle = useRef("");
    const newsAuthor = useRef("");
    const newsPublicationDate = useRef("");
    const newsImageUrl = useRef("");
    const newsContent = useRef("");

    const [sourceError, setSourceError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:7080/api/News/${id}`)
            .then((response) => {
                newsSource.current.value = response.data.value.source;
                newsTitle.current.value = response.data.value.title;
                newsAuthor.current.value = response.data.value.author;
                newsPublicationDate.current.value = response.data.value.publicationDate;
                newsImageUrl.current.value = response.data.value.imageUrl;
                newsContent.current.value = response.data.value.content;
                window.scrollTo(0, 0);
            });
    }, []);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    function EditNewsHandler() {
        if (newsSource.current.value.length >= 250) {
            setSourceError(true);
            return;
        }
        if (newsTitle.current.value.length < 2 || newsTitle.current.value.length >= 250) {
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
            content: newsContent.current.value
        };

        axios
            .patch(`https://localhost:7080/api/News/${id}`, payload)
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    function deleteConfirmHandler() {
        axios.delete(`https://localhost:7080/api/News/${id}`)
            .then(() => {
                navigate("/home");
            });
    }

    return (
        <>
            <h1>EDIT</h1>
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
                        <Form.Control type="text" placeholder={newsTitle} ref={newsTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder={newsAuthor} ref={newsAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsPublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder={newsPublicationDate} ref={newsPublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The news needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder={newsImageUrl} ref={newsImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formNewsContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's an news after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder={newsContent}
                            ref={newsContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={EditNewsHandler}>
                        Edit News
                    </Button>

                    <Button className="deleteBtn" variant="primary" type="button" onClick={deleteConfirmHandler}>
                        Delete News
                    </Button>

                </Form.Group>
            </Form>
        </>
    )
}

export default EditNews;