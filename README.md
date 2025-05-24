ChronoVault
Welcome to ChronoVault, a digital time capsule that brings history to life for enthusiasts aged 16-40! Backed by the fictional TimeKeepers Archive, ChronoVault invites you to explore eras like Ancient Egypt and Renaissance Europe through interactive galleries, quizzes, and a personalized explorer hub. With the tagline "Unlock the Past, Explore the Future", this website offers a branded, immersive experience, built as part of the Web & Multimedia Development module at the School of Computing and Information Systems.
Hosted on GitHub Pages, ChronoVault combines stunning visuals, responsive design, and engaging features to make history an adventure. Whether you're a student, educator, or history buff, dive in to uncover artifacts, earn badges, and track your journey through time!
Features
ChronoVault is packed with features to make exploring history fun and informative:

Responsive Navbar: A sleek, black navigation bar (powered by Bootstrap) links to all pages, collapsing on mobile for easy access.
Hero Sections: Each era page (e.g., egypt.html) features a full-width banner with vivid backgrounds (e.g., pyramids) and bold titles.
Interactive Gallery: Flip cards (.art-gallery-wrapper) display artifacts (e.g., "Great Sphinx of Giza, guardian of the pyramids"), shrinking to 200x200px when flipped for clear facts.
Static Gallery: Rotated images (.art-gallery) showcase additional artifacts with captions, enhancing visual appeal.
Quizzes: Test your knowledge on each era, with results saved to unlock badges in the Explorer Hub.
Explorer Hub (explorer.html): Track progress with:
Achievement cards (.achievement-card) for milestones.
Badges grid (.badges-grid) for quiz rewards.
Timeline (.timeline-entries) showing your historical journey.


Contact Form: A feedback form on contact.html with HTML5 validation to share thoughts with TimeKeepers Archive.
Consistent Branding: Hourglass logo, brown (#8B4513) and black (#000000) color scheme, and Cairo font create a cohesive, historical aesthetic.

Technologies Used
ChronoVault is built with modern web technologies and tools, ensuring W3C compliance and a smooth user experience:

HTML5 (v5.3): Semantic structure for pages, flip cards, and forms.
CSS3 (Level 3): Styles in css/style.css for animations (e.g., .flip-card-inner.flipped { transform: rotateY(180deg); }), responsive design (media queries: 1024px, 768px, 480px), and branding.
JavaScript (ES6): js/main.js powers flip card toggles, gallery scrolling, quiz logic (using localStorage), and timeline updates.
Bootstrap (v5.3.3): CDN for responsive navbar, grids, and buttons.
Tools:
Visual Studio Code (v1.93): IDE with Live Server, Prettier, and ESLint.
GIMP (v2.10.36): Created logo and optimized images (<100KB).
Figma (web, 2025): Designed wireframes and color palette.
Git (v2.46.0) and GitHub Desktop (v3.4.3): Version control and repo management.


Resources:
Images: Unsplash (e.g., images/sphinx.jpg).
Fonts: Cairo via Google Fonts.
Icons: Font Awesome (v6.5.2).



File Structure
The repository (ABC19-001) is organized for clarity:
ABC19-001/
├── index.html            # Homepage with era grid
├── egypt.html            # Ancient Egypt era page
├── rome.html             # Ancient Rome era page
├── medieval.html         # Medieval Era page
├── renaissance.html      # Renaissance Era page
├── industrial.html       # Industrial Era page
├── modern.html           # Modern Era page
├── explorer.html         # Explorer Hub for achievements
├── contact.html          # Contact form page
├── css/
│   └── style.css         # Styles for layout and animations
├── js/
│   └── main.js           # Interactivity logic
├── images/
│   ├── logo.png          # ChronoVault hourglass logo
│   ├── sphinx.jpg        # Artifact image
│   └── colosseum.jpg     # Artifact image
└── README.md             # Project documentation

Setup Instructions
To run ChronoVault locally or view it online:

Clone the Repository:
git clone https://github.com/username/ABC19-001.git
cd ABC19-001


View Locally:

Open index.html in a browser (e.g., Chrome, Firefox).
Or use VS Code with Live Server extension for a live preview.


View Online:

Visit the GitHub Pages site: (Placeholder) https://username.github.io/ABC19-001


Dependencies:

No installation needed; Bootstrap, Font Awesome, and Google Fonts are loaded via CDN.
Ensure an internet connection for CDN resources.



Usage
Explore ChronoVault like a historical adventure:

Start at Home (index.html): Click an era (e.g., “Ancient Rome”) from the era grid.
Era Pages: View the hero section, explore flip cards (click to flip to 200x200px for facts), browse static gallery, and take a quiz.
Explorer Hub (explorer.html): Check achievement cards, view earned badges, and see your timeline of progress.
Contact Us (contact.html): Submit feedback via the form.
Navigate using the navbar or footer links, all tested for no broken links.

The site is responsive, adapting to laptops, tablets, and phones (e.g., flip cards resize to 96x96px at 480px), and works on Chrome, Firefox, Safari, and Edge.
Hosting
ChronoVault is deployed on GitHub Pages:

Repo: ABC19-001
URL: (Placeholder) https://username.github.io/ABC19-001
Deployment:git add .
git commit -m "Deploy ChronoVault"
git push origin main


Enabled GitHub Pages in repo settings, hosting from main branch.

Git commits track development (e.g., “Added quiz logic,” “Updated navbar”), meeting assignment requirements.
Contributing
Feedback is welcome to make ChronoVault even better! To contribute:

Fork the repo.
Create a branch (git checkout -b feature-name).
Commit changes (git commit -m "Add feature").
Push to your fork (git push origin feature-name).
Open a pull request.

Please test changes locally and ensure no broken links or styling issues.
Credits

Images: Unsplash for high-quality, free artifact photos.
Fonts: Google Fonts (Cairo).
Icons: Font Awesome.
Tools: VS Code, GIMP, Figma, GitHub.
Inspiration: Web & Multimedia Development module, Chapter 3 (Website Design Process).


Built by [Your Name], SCIS, May 2025. Let’s unlock history together with ChronoVault!
