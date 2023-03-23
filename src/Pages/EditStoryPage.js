import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function EditStory() {
    const storyTitle = useRef("");
    const storyAuthor = useRef("");
    const storySeries = useRef("");
    const storyPublicationDate = useRef("");
    const storyImageUrl = useRef("");
    const storyContent = useRef("");

    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [seriesError, setSeriesError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:7080/api/Stories/${id}`)
            .then((response) => {
                storyTitle.current.value = response.data.value.title;
                storyAuthor.current.value = response.data.value.author;
                storySeries.current.value = response.data.value.series;
                storyPublicationDate.current.value = response.data.value.publicationDate;
                storyImageUrl.current.value = response.data.value.imageUrl;
                storyContent.current.value = response.data.value.content;
                window.scrollTo(0, 0);
            });
    }, []);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    window.scrollTo(0, 0);

    function EditStoryHandler() {
        if (storyTitle.current.value.length < 2 || storyTitle.current.value.length >= 250) {
            setTitleError(true);
            return;
        }
        if (storyAuthor.current.value.length < 2 || storyAuthor.current.value.length >= 250) {
            setAuthorError(true);
            return;
        }
        if (storySeries.current.value.length < 2 || storySeries.current.value.length >= 250) {
            setSeriesError(true);
            return;
        }
        if (!validateDate(storyPublicationDate.current.value)) {
            setDateError(true);
            return;
        }
        if (storyImageUrl.current.value.length < 2 || storyImageUrl.current.value.length >= 250) {
            setImageUrlError(true);
            return;
        }
        if (storyContent.current.value.length < 2) {
            setContentError(true);
            return;
        }

        const payload = {
            id: id,
            title: storyTitle.current.value,
            series: storySeries.current.value,
            author: storyAuthor.current.value,
            publicationDate: storyPublicationDate.current.value,
            imageUrl: storyImageUrl.current.value,
            content: storyContent.current.value
        };

        axios
            .put(`https://localhost:7080/api/Stories/${id}`, payload)
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    function deleteConfirmHandler() {
        axios.delete(`https://localhost:7080/api/Stories/${id}`)
            .then(() => {
                navigate("/home");
            });
    }

    return (
        <>
            <h1>EDIT</h1>
            <Form>
                <Form.Group className="form-box">

                    <Form.Group className="label-1" controlId="formStoryTitle">
                        <Form.Label>Title</Form.Label>
                        {titleError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid title.
                            </div>}
                        <Form.Control type="text" placeholder={storyTitle} ref={storyTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder={storyAuthor} ref={storyAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStorySeries">
                        <Form.Label>Series</Form.Label>
                        {seriesError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid series.
                            </div>}
                        <Form.Control type="text" placeholder={storySeries} ref={storySeries} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryPublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder={storyPublicationDate} ref={storyPublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The story needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder={storyImageUrl} ref={storyImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's a story after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder={storyContent}
                            ref={storyContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={EditStoryHandler}>
                        Edit Story
                    </Button>

                    <Button className="deleteBtn" variant="primary" type="button" onClick={deleteConfirmHandler}>
                        Delete Story
                    </Button>

                </Form.Group>
            </Form>
        </>
    )
}

export default EditStory;