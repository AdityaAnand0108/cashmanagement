import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./About.css";

/**
 * Two ways to provide the profile picture:
 * 1) Pass imageUrl prop: <AboutMe imageUrl="/assets/profile.jpg" />
 * 2) Import locally at top of this file (uncomment the line below) and don't pass imageUrl.
 */
// import profilePic from "../../assets/profile.jpg";

const About = () => {
  const avatarSrc = "src/assets/profile.JPEG"; // default path — replace with your actual path if needed

  return (
    <div className="about-card">
      <CardContent>
        <div container spacing={2} alignItems="center">
          {/* Left: Avatar + Basic Details */}
          <div className="about-left">
            <Avatar
              alt="Profile"
              src={avatarSrc}
              sx={{ width: 140, height: 140 }}
              className="about-avatar"
            />
            <Typography variant="h5" className="about-name" gutterBottom>
              Aditya Anand Mishra
            </Typography>
            <Typography variant="body2" className="about-role">
              Full Stack Developer
            </Typography>

            <div className="about-contact">
              <Typography variant="body2">
                <strong>Location:</strong> India
              </Typography>
              <Typography variant="body2">
                <strong>Experience:</strong> 4.2 years (React, Java, Spring
                Boot)
              </Typography>
              <Typography variant="body2">
                <strong>Company:</strong> Cognizant Technology Solutions (4 years) , LTIMindtree (0.3 years)
              </Typography>
            </div>

            <div className="about-links">
              <Button
                size="small"
                variant="outlined"
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/aditya-mishra-passionate/" /* replace with actual link */
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Button>

              <Button
                size="small"
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/AdityaAnand0108" /* replace with actual link */
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right: About & Projects */}
          <div className="about-right">
            <section className="about-section">
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body1" paragraph>
                Hi, I’m Aditya Mishra, a full-stack developer with over four
                years of experience working on large-scale web applications
                using React.js, Java, and Spring Boot. I’ve handled complete
                feature development — from building secure REST APIs and
                microservices integration to developing responsive, optimized
                React interfaces. In my past projects, I focused on performance
                optimization, input sanitization, and role-based access control,
                ensuring both speed and security. I’ve also worked on data-heavy
                modules with real-time filtering, pagination, and lazy loading
                to enhance user experience. I use tools like Docker, Jenkins,
                and Git, follow Agile and CI/CD practices, and emphasize writing
                clean, testable code that delivers consistent results across the
                full stack.
              </Typography>
            </section>

            <section className="about-section">
              <Typography variant="h6" gutterBottom>
                Selected Project — CashManagement
              </Typography>
              <Typography variant="body1" paragraph>
                The CashManagement project is a comprehensive financial
                management system designed to help organizations monitor,
                manage, and optimize cash flow across multiple business units.
                It provides real-time visibility into transactions, balances,
                and forecasting — enabling smarter financial decisions and
                improved liquidity control.
              </Typography>
            </section>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default About;
