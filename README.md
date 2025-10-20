## Profile Card Component & Stage 1 (Multi-Page Expansion)

This project expands on the original Profile Card Component by introducing two new, fully functional pages an About Me page and a Contact Us page while maintaining the same focus on accessibility, responsiveness, and clean, semantic code.
The project is built with semantic HTML, modern CSS, and vanilla JavaScript for lightweight, modular functionality.

## Live

 GitHub Repository: [https://github.com/Owens01/profile-card-frontend](https://github.com/Owens01/profile-card-frontend)

## Project Overview
Stage 0: Profile Card Component

A single, responsive card displaying:

User name, bio, and avatar

Hobbies, dislikes, and social links

Real-time clock showing milliseconds

All data tested using strict data-testid attributes

Stage 1: Multi-Page Application

Built upon Stage 0, this stage adds:

About Me Page: A reflective page with detailed personal insights, goals, and thoughts.

Contact Us Page: A functional contact form with real-time validation and accessible feedback.

Navigation: Simple, consistent links connecting all pages (Home, About, Contact).

## New Features (Stage 1)

✅ Two new pages (about.html and contact.html)
✅ Form validation using JavaScript
✅ Dynamic success & error messages tied to inputs with aria-describedby
✅ Accessible, keyboard-navigable interface
✅ Semantic layout using <main>, <section>, <header>, <nav>, and <footer>
✅ Fully responsive on mobile, tablet, and desktop
✅ Reusable global stylesheet and script for consistency

## Page Details
 Home (Stage 0)
Displays the user’s profile card from Stage 0 with all previously tested elements.

About Me Page
A semantic page wrapped in <main data-testid="test-about-page"> with five reflective sections:

Section	data-testid
Bio test-about-bio
Goals in this program	test-about-goals
Areas of low confidence	test-about-confidence
Note to future self	test-about-future-note
Extra thoughts	test-about-extra

Each section uses proper headings and paragraphs for clarity and readability.

## Contact Us Page

A simple yet functional form with validation rules:

Field	data-testid	Validation
Full Name	test-contact-name	Required
Email	test-contact-email	Required, must be a valid email (name@example.com)
Subject	test-contact-subject	Required
Message	test-contact-message	Required, minimum 10 characters

Other required elements

Submit Button → test-contact-submit

Error Messages → test-contact-error-<field>

Success Message → test-contact-success

