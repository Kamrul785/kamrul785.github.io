# Kamrul Hasan academic portfolio

## Audience and purpose

Give researchers, graduate supervisors, and recruiters a single shareable profile. A first-time visitor should be able to identify Kamrul’s research focus, find his papers and experience, inspect his engineering work, and contact him.

## Approaches

- **Selected: Research-led single page.** Use the reference site’s compact identity block and scan-friendly academic sections. Give research the first substantive section and add direct navigation to engineering work and contact.
- **Considered: Multi-page research and engineering site.** Dedicated pages would support longer case studies as the portfolio grows. The current amount of material fits comfortably on one page.

## Structure and content

- Header and profile: full name, location, student researcher role, concise research introduction, and links to the CV, email, GitHub, LinkedIn, and tech portfolio. Reuse Kamrul’s public portrait from his tech site if available and suitable.
- Research: trustworthy AI, interpretable medical imaging, and evaluation under distribution shift. Feature the co-authored MRI-to-ultrasound paper with its SPICSCON 2026 acceptance status and InterveneDR with its first-author, in-preparation status. Include the heart-failure study as a project with a presentation link. Use a DOI only if verified.
- Experience and education: ELITE Research Lab and the machine-learning internship, followed by the PCIU B.Sc. and 3.98/4.00 GPA. The resumes disagree on the expected completion month, so omit the month and any claim that the degree has been awarded until confirmed.
- Engineering: lead with Krishok Bhai, then show PhiMart and Tuition Hub with short descriptions and repository or demo links.
- Teaching and recognition: include the C++ bootcamp, PCIU Computer Club mentorship, ICPC regional finalist result, and Solvio hackathon placement. Close with a direct contact link for research and engineering inquiries.
- Provide a print-friendly academic CV page or approved public CV asset. Keep the attached PDFs as source material and omit the personal phone number from the site.

## Visual direction

Use white (#FFFFFF), cool paper (#F3F7F8), deep ink (#162B3B), muted slate (#4B5E69), and deep teal (#006B66). Set the name and section headings in Spectral and supporting text in Source Sans 3, with local fallbacks. Use left-aligned copy, clear section spacing, and short paper summaries. Publication rows should make the title, authorship role, and status easy to scan. Reserve the strongest accent for links and primary actions.

```text
Desktop                      Mobile
Name             Section nav Name             Nav
Profile  |  Introduction    Profile + introduction
Links    |  Research         Research
         |  Experience       Experience
         |  Projects         Projects
         |  Teaching         Teaching
         |  Contact          Contact
```

## Implementation and checks

Build dependency-free static HTML and CSS in the local workspace, with lightweight JavaScript only if the interaction needs it. Keep the existing tech portfolio as an outbound destination. Use semantic landmarks, keyboard-accessible navigation, readable contrast, and responsive layouts. Check the rendered desktop and mobile layouts, section anchors, CV entry, and outbound link targets. Deliver the verified local site. A hosting destination can be selected separately.
