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
    const [story, setStory] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:7080/Stories/GetStoryById?id=${id}`)
            .then((response) => {
                setStory(() => {
                    return response.data.value;
                });
                // storyTitle.current.value = story.title;
                // storyAuthor.current.value = story.author;
                // storySeries.current.value = story.series;
                // storyPublicationDate.current.value = story.publicationDate;
                // storyImageUrl.current.value = story.imageUrl;
                // storyContent.current.value = story.content;
                window.scrollTo(0, 0);
            });
    }, [storyTitle.current.value]);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    window.scrollTo(0, 0);

    function EditStoryHandler() {
        if (storyTitle.current.value === "") {
            setTitleError(true);
            return;
        }
        if (storyAuthor.current.value === "") {
            setAuthorError(true);
            return;
        }
        if (storySeries.current.value === "") {
            setSeriesError(true);
            return;
        }
        if (!validateDate(storyPublicationDate.current.value)) {
            setDateError(true);
            return;
        }
        if (storyImageUrl.current.value === "") {
            setImageUrlError(true);
            return;
        }
        if (storyContent.current.value === "") {
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
            .put("https://localhost:7080/Stories/EditStory", payload)
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    function deleteConfirmHandler() {
        axios.delete(`https://localhost:7080/Stories/DeleteStory?id=${id}`)
            .then((response) => {
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
                                Please enter a title.
                            </div>}
                        <Form.Control type="text" placeholder={storyTitle} ref={storyTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStoryAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter an author.
                            </div>}
                        <Form.Control type="text" placeholder={storyAuthor} ref={storyAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formStorySeries">
                        <Form.Label>Series</Form.Label>
                        {seriesError &&
                            <div style={{ color: 'red' }}>
                                Please enter a series.
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