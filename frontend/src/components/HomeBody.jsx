import React from 'react'
import './HomeBody.css'
export default function HomeBody(){
    return(
        <div className="homeBody">
            <div className="topSection">
                <div className="imgCont">
                    <img src="movieTheater.png" />
                </div>
                <div className="textCont">
                    <p>West Texas Movies is a locally owned and operated movie 
                        theater group that brings the magic of the big screen to 
                        communities across West Texas. With six unique locations 
                        in Lubbock, Amarillo, Levelland, Plainview, Snyder, and 
                        Abilene, West Texas Movies is dedicated to providing a 
                        top-tier cinematic experience to audiences of all ages. 
                        Whether you're catching the latest blockbuster, an indie 
                        favorite, or a family-friendly feature, our theaters offer 
                        state-of-the-art screens, immersive sound, and a cozy hometown
                         atmosphere. We take pride in being a part of the local community,
                          offering affordable tickets, friendly service, and a genuine 
                          love for film that keeps our guests coming back again and again.
                    </p>
                </div>
            </div>

            <div className="bottomSection">
                <div className="textCont">
                    <p>Welcome to the West Texas Movies website! Here, you can easily 
                        log in to your account, browse current movie times, and purchase 
                        tickets at any of our locations. Want to see what's hitting theaters soon?
                         Just head to the Upcoming Movies section. Looking for something specific? 
                         Use the Search feature to quickly find the movie you're after. Everything 
                         you need for a great movie night is just a few clicks away!
                    </p>
                </div>
                <div className="imgCont">
                    <img src="theaterInside.png" />
                </div>
            </div>
        </div>
    )
}