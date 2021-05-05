const Blog = require("./models/blog");

const blogs = [
  {
    title: "How to Distinguish a Good Programmer from a Bad One",
    img: "https://miro.medium.com/max/700/0*71AywArzaLBItb20",
    body: `For many, a programmer is a dream profession. Young (and not so) people storm the admissions offices of technical universities, study video tutorials, and laugh at clever jokes in the “Typical Programmer” communities and the like.
Moreover, many people study programming at universities and training centers, sincerely believing that the cherished crust will open the doors to an exciting profession. Company representatives will line up to get a newly minted specialist in their staff. This is rarely the case. And the reason for this is the mistakes made by the programmers themselves.
I recalled many statements by employers and teachers throughout my programming journey and came up with 5 signs by which they distinguish a good programmer from a bad one.
1. Lack of self-discipline
It has been said many times, but I will repeat it: programming is not only creativity but also hard work that requires perseverance, patience, and the ability to organize your workflow.
Can’t sit in your chair for more than 30 minutes of coding? This is not required — in the end, it can harm your health. Take a break, have some tea. The main thing is functionality — the task must be done, errors must be fixed, and all the code must be clean and up-to-date.
What you can do:
Discipline yourself. Plan time for work and leisure. Read about the Pomodoro technique — it helps many to increase the productivity of personal labor.
2. Going to extremes
I often have to deal with someone else’s code that does not compile. What would a bad programmer do in this case? Erase everything and start writing again. This is fraught with several things:
The risk of aggravating the situation. By the way, an overly self-confident programmer does not like it very much when he is caught by the hand when making a mistake.
Depriving yourself of the opportunity to learn by parsing someone else’s code, even if it is not working. Being able to read another person’s code is a great skill.
What you can do:
Don’t go to extremes. Learn to work autonomously and in a team. Soak up new experiences, even if you consider yourself the coolest programmer on the team.
3. Inability to build algorithms
There is an opinion: a bad programmer immediately writes code, and a good one first builds the architecture of the project. It isn't easy to disagree with this. Over the years of working, I have made sure that as a programmer, I have not developed the habit of carefully considering and structuring the task they face and only then taking on its solution. This also applies to developing a commenting system in PHP, a calculator in Delphi, and even writing the notorious “Hello, World!” on any YP.
What you can do:
Develop structural thinking. Always break down a large task into sub-tasks. Think out loud about the code. Draw diagrams of the future project on paper. And only then open the editor. So you, of course, will not get rid of bugs and “crutches” completely, but at least reduce their number.
4. Reluctance to learn
The field of programming is evolving daily, and using old methods (even if they are still working) is not a sign of a good specialist.
What you can do:
Stay tuned. Read new books from the field you are studying. Browse themed blogs. Participate in discussions, and don’t be afraid to seem stupid.
5. Failure to complete projects
So you started learning to program. It commands respect. If you do it yourself, then you deserve doubly respect. One morning you pick up a heavy book and start reading. When you get to the exercises, you decide that you can skip them (it seems that the material is clear anyway), then you skip several chapters, and after a week, you realize that you have already forgotten where this book is. All — the matter has not been brought to an end. Did you recognize yourself? Fix it quickly.
What you can do:
In programming, the process is important, but the result is just as important. You MUST find the answer to the question posed. You MUST solve the problem that the teacher or the author of the textbook set for you. You MUST complete the project. One day, “getting things done” will become a habit, and you will be a pro.
All these qualities somehow live in each of us. We know how to get rid of them. Don’t let them consume you and ruin your career as a programmer.`,
  },
  {
    title:
      "Geothermal technology has enormous potential to power the planet and Fervo wants to tap it",
    img:
      "https://techcrunch.com/wp-content/uploads/2010/08/geothermal.png?w=1390&crop=1",
    body: `Tapping the geothermal energy stored beneath the Earth’s surface as a way to generate renewable power is one of the new visions for the future that’s captured the attention of environmentalists and oil and gas engineers alike.

        That’s because it’s not only a way to generate power that doesn’t rely on greenhouse gas emitting hydrocarbons, but because it uses the same skillsets and expertise that the oil and gas industry has been honing and refining for years.
        
        At least that’s what drew former the former completion engineer (it’s not what it sounds like) Tim Latimer to the industry and to launch Fervo Energy, the Houston-based geothermal tech developer that’s picked up funding from none other than Bill Gates’ Breakthrough Energy Ventures (that fund… is so busy) and former eBay executive, Jeff Skoll’s Capricorn Investment Group.
        
        With the new $28 million cash in hand Fervo’s planning on ramping up its projects which Latimer said would “bring on hundreds of megawatts of power in the next few years.”
        
        Latimer got his first exposure to the environmental impact of power generation as a kid growing up in a small town outside of Waco, Texas near the Sandy Creek coal power plant, one of the last coal-powered plants to be built in the U.S.
        
        Like many Texas kids, Latimer came from an oil family and got his first jobs in the oil and gas industry before realizing that the world was going to be switching to renewables and the oil industry — along with the friends and family he knew — could be left high and dry.
        
        It’s one reason why he started working on Fervo, the entrepreneur said.
        
        “What’s most important, from my perspective, since I started my career in the oil and gas industry is providing folks that are part of the energy transition on the fossil fuel side to work in the clean energy future,” Latimer said. “I’ve been able to go in and hire contractors and support folks that have been out of work or challenged because of the oil price crash… And I put them to work on our rigs.”`,
  },
  {
    title:
      "Developer-focused video platform Mux achieves unicorn status with $105M funding",
    img:
      "https://techcrunch.com/wp-content/uploads/2020/07/GettyImages-1217545010.jpg?w=1390&crop=1",
    body: `Barely more than eight months after announcing a $37 million funding round, Mux has another $105 million.

        The Series D was led by Coatue and values the company at more than $1 billion (Mux isn’t disclosing the specific valuation). Existing investors Accel, Andreessen Horowitz and Cobalt also participated, as did new investor Dragoneer.
        
        Co-founder and CEO Jon Dahl told me that Mux didn’t need to raise more funding. But after last year’s Series C, the company’s leadership kept in touch with Coatue and other investors who’d expressed interest, and they ultimately decided that more money could help fuel faster growth during “this inflection moment in video.”
        
        Building on the thesis popularized by A16Z co-founder Marc Andreessen, Dahl said, “I think video’s eating software, the same way software was eating the world 10 years ago.” In other words, where video was once something we watched at our desks and on our sofas, it’s now everywhere, whether we’re scrolling through our social media feeds or exercising on our Pelotons.`,
  },
];

const seedDB = async () => {
  await Blog.insertMany(blogs);
  console.log("DB Seeded");
};

module.exports = seedDB;
