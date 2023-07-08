import React from 'react';
import '../Styles/App.css'
import '../Styles/about.css'
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

const AboutPage = () => {
    return (
        <div className="about">
            <Navbar />
            <div className='void'/>

            <div className='section'>
                <div className='section-header'>
                    <h1>The Beginnings</h1>
                </div>

                <div className='box'>
                    <h3>The story of the Azure Archive begun many years ago, depending on when you are reading this. If it’s still 2023, I’m terribly sorry, I’ve no idea how you got here. Alas, it has begun like many great stories, not in a garage. Seriously, who has a 12x22 feet room just for their car and still calls it a humble start-up?</h3>
                    <h3>
                        It was an idea born of a dream, that one day <span style={{ textDecoration: 'line-through', textDecorationColor: 'white' }}>I</span> we would store our imagination someplace other than a messy folder brimming with mostly one-page docs. If you thought turtles had a high mortality rate, you should see drafts. Actually, don’t. We only put out high-quality, finished material. Sometimes.
                    </h3>
                    <h3>We started from the ground. Literally, <span style={{ textDecoration: 'line-through', textDecorationColor: 'white' }}>I was so parsimonious that</span> we couldn’t even afford a developer to build this relatively quick and simple platform. Not to mention the art.</h3>
                    <h3>And to the ground we shall return. Anything else would mean work. Which can be a bit tricky to sustain at a professional standard, particularly when you aren’t exactly a business. Not that we’d mind getting paid, but that’d come with actually becoming responsible to our patrons and readers. Which kind of sounds like work, and we can’t have that, can we?</h3>
                </div>
            </div>

            <div className='section'>
                <div className='box two' id='faq'>
                    <h2 id='contact'>Can I freely publish my own articles and stories?</h2>
                    <h3>Of course, just hit us up at the <span style={{ textDecoration: 'underline', textDecorationColor: 'white' }}>azurearchive@gmail.com</span> and we’ll go from there.</h3>
                    <h2>Is fanfiction allowed?</h2>
                    <h3>As long as you have a written permission from the rightful owners or they’ve
                        publicly stated being okay with fanfiction, I don't see why not.</h3>
                    <h2>Would you do commissions or joint projects?</h2>
                    <h3>Sure thing.</h3>
                    <h2>Favourite author, setting, and story?</h2>
                    <h3>Brandon Sanderson, Warhammer 40k, Arcane. I wanna see a mixture of the these before I die.</h3>
                    <h2>Any advice for a fellow writer?</h2>
                    <h3>Procrastination be a scrab in the dungbie.</h3>
                    <h2>Cool art, who's the artist?</h2>
                    <h3>Main credits go to Freepik, particulary to Liu Zishan for the stories page
                        background. I recommend you check more of his concept art at makie.artstation.com.
                        For the covers, it's either ai, public domain or the artists credited
                        at the end of each page.</h3>

                </div>
                <div className='section-header two' id='Q&A'>
                    <h1>Q&A</h1>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AboutPage;