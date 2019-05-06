# `Influen$e Content Market Watch`

More than 6 billion images and videos are uploaded and shared every single day. Every one of them is worth something to somebody.

##### The idea
What if I could build a simple-to-use app that identified the dollar value of image and video content, and allowed people to buy and sell that content&mdash;all in __real time__?

##### The 8-hour challenge
Building an AI powered app to receive, process, manage and display the overwhelming amount of pictures, videos, and unstructured data people upload every day is just crazy!

Additionally, there are many platforms for uploading and sharing, and no two are alike.

Sure, I can make that in a day.

##### The frontend solution
I started with the most efficient tools, pen and paper, to wireframe the application, focusing on the overall user experience, but also identifying technology requirements and challenges before going into design and code.

I referenced the [Influen$e UI design](https://www.influense.me "Influen$e") to maintain brand consistency, however I wanted MarketWatch to be a standalone app for the sake of revenue generation.

Once I settled on the UI design, I turned to ReactJS to code the frontend. Purposely choosing to avoid Redux, Axios or other packages, I was able to quickly develop a robust, component-based UI that would talk to the backend API via Django Rest Framework.

##### The backend tech solution
Lucky for me, I've already developed Pixt AI, a machine learning platform that's designed to understand the emotions, behaviors and personality of pictures and videos that people upload and share, regardless of the source of the content, and deliver that previously unknown data.

Using the Pixt API, I was able to send JSON requests to receive Visual Intelligence data, then leveraging my Influen$e platform's ability to identify and define a real dollar value of visual content (pictures and videos), I had a very robust AI backend to process data and devliver on valuation.

To keep things relatively simple, I focused on Instagram's notorious API as a source of content (source of the majority of user generated content), and I've chosen Stripe as my backend payment system.

##### How it works
Using my previously developed platforms, I made a system that synchronizes Instagram content posted by users and influencers.

Pixt AI processes the incoming visual content in real-time, then sends it to Influen$e to determine the value based on trend-worthiness, emotional and brand value, and more.

The final MarketWatch app interfaces with the big data backend to stream a live feed of uploaded visual content, dollar values, acquisition costs, and more in real-time.

<a href="https://marketwatch.influense.me" class="uk-button uk-button-danger uk-button-large">Visit MarketWatch</a>
