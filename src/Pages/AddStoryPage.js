import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function AddStory() {
    window.scrollTo(0, 0);
    const storyTitle = useRef("");
    const storyAuthor = useRef("");
    const storySeries = useRef("");
    const storyPublicationDate = useRef("");
    const storyImageUrl = useRef("");
    const storyContent = useRef("");

    const navigate = useNavigate();

    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [seriesError, setSeriesError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    function AddStoryHandler() {
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
            title: storyTitle.current.value,
            series: storySeries.current.value,
            author: storyAuthor.current.value,
            publicationDate: storyPublicationDate.current.value,
            imageUrl: storyImageUrl.current.value,
            content: storyContent.current.value
        };

        axios
            .post("https://localhost:7080/api/Stories", payload)
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    return (
        <>
            <h1>Create Story</h1>
            <Form>
                <Form.Group className="form-box">

                    <Form.Group className="label-1" controlId="formStoryTitle">
                        <Form.Label>Title</Form.Label>
                        {titleError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid title.
                            </div>}
                        <Form.Control type="text" placeholder="Title" ref={storyTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder="Author" ref={storyAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStorySeries">
                        <Form.Label>Series</Form.Label>
                        {seriesError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid series.
                            </div>}
                        <Form.Control type="text" placeholder="Series" ref={storySeries} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryPublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder="YYYY-MM-DD" ref={storyPublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The story needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder="https://www.example.com" ref={storyImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's a story after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder="Lorem ipsum..."
                            ref={storyContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={AddStoryHandler}>
                        ADD STORY
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default AddStory;
