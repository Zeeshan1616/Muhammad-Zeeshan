document.addEventListener('DOMContentLoaded', () => {
    // Zee AI Assistant Chatbot

    const knowledge = {
        name: "Muhammad Zeeshan",
        title: "Computer Systems Engineering Student",
        university: "Mehran University of Engineering and Technology (MUET)",
        location: "Jamshoro, Sindh, Pakistan",
        education: "B.E. Computer Systems Engineering (2025-2029)",
        email: "mzeeshan44203@gmail.com",
        linkedin: "linkedin.com/in/muhammad-zeeshan-0235b4385",
        github: "github.com/Zeeshan1616",
        skills: {
            languages: ["C++", "Java", "Python"],
            web: ["HTML5", "CSS3"],
            concepts: ["Object-Oriented Programming", "Data Structures", "Algorithms"],
            database: ["SQL", "SQLite"],
            exploring: ["Artificial Intelligence", "Machine Learning", "Data Science"],
            tools: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"]
        },
        internships: [
            {
                company: "CodeAlpha",
                role: "Java Programming Intern",
                type: "Virtual",
                year: "2026",
                status: "Completed",
                projects: ["Student Grade Tracker (Java Swing GUI)", "Hotel Reservation Management System"],
                skills_used: ["Java", "Swing", "OOP", "Serialization"]
            },
            {
                company: "DecodeLabs",
                role: "Python Programming Intern",
                type: "Virtual",
                year: "2026",
                status: "Completed",
                projects: ["To-Do List App", "Expense Tracker (SQLite)", "Random Password Generator"],
                skills_used: ["Python", "SQLite", "Security"]
            },
            {
                company: "Arch Technologies",
                role: "Data Science Intern",
                type: "Virtual",
                year: "2026",
                status: "Upcoming",
                domain: "Data Science"
            }
        ],
        projects: [
            { name: "C++ Calculator", lang: "C++", github: "github.com/Zeeshan1616/C-Calculator", desc: "Feature-rich calculator with basic arithmetic operations" },
            { name: "Student Grade Tracker", lang: "Java", github: "github.com/Zeeshan1616/CodeAlpha-Task-1", desc: "Desktop app with Swing GUI, live statistics, report generation" },
            { name: "Hotel Reservation System", lang: "Java", github: "github.com/Zeeshan1616/CodeAlpha-Task-2", desc: "Full-featured hotel system with dual portals and persistent storage" },
            { name: "To-Do List App", lang: "Python", github: "github.com/Zeeshan1616/DecodeLabs-Internship/tree/Task-1", desc: "Console-based task manager demonstrating Python lists" },
            { name: "Expense Tracker", lang: "Python", github: "github.com/Zeeshan1616/DecodeLabs-Internship/tree/Task-2", desc: "CLI expense tracker with SQLite persistence and summary reports" },
            { name: "Random Password Generator", lang: "Python", github: "github.com/Zeeshan1616/DecodeLabs-Internship/tree/Task-3", desc: "Cryptographic password generator with entropy calculation" },
            { name: "Password Strength Checker", lang: "Python", github: "github.com/Zeeshan1616/Python/tree/Password-Checker-version-1", desc: "CLI tool that scores passwords on a 5-star scale" },
            { name: "Student Manager", lang: "Python", github: "github.com/Zeeshan1616/Python/tree/Student-Management-System", desc: "Interactive CLI for managing student records" },
            { name: "Portfolio Website", lang: "HTML/CSS/JS", github: "github.com/Zeeshan1616/Muhammad-Zeeshan", desc: "Responsive dark-mode portfolio with AI chatbot, SEO, and certificate viewer" }
        ],
        certifications: 17,
        cert_categories: ["AI/ML", "Data Science", "Python", "HTML", "CSS", "SQL", "Leadership", "Communication"]
    };

    function getResponse(input) {
        const lower = input.toLowerCase().trim();

        // Greeting
        if (/^(hello|hi|hey|salam|assalam|assalamualaikum|hola)/i.test(lower)) {
            return "Hello! I'm Zee, Muhammad Zeeshan's AI assistant. I can tell you about his skills, projects, internships, education, or certifications. What would you like to know?";
        }

        // Thank you
        if (/thank|thanks|shukriya|jazak/i.test(lower)) {
            return "You're welcome! Feel free to ask anything else about Zeeshan's work.";
        }

        // Bye
        if (/^(bye|goodbye|quit|exit|see you)/i.test(lower)) {
            return "Goodbye! Thanks for visiting Muhammad Zeeshan's portfolio.";
        }

        // Help
        if (/^(help|what can you do|options|menu)/i.test(lower)) {
            return "I can help you with:\n\n🔹 Skills & Technologies\n🔹 Projects & Work\n🔹 Internships & Experience\n🔹 Education & University\n🔹 Certifications\n🔹 Contact Information\n\nJust ask me anything!";
        }

        // Name - Zee
        if (/what'?s your name|who are you|what are you|your name/i.test(lower)) {
            return "I'm Zee, the AI assistant for Muhammad Zeeshan's portfolio! I'm here to help you learn about Zeeshan's work and experience.";
        }

        // Who is Zeeshan / About
        if (/who is zeeshan|about zeeshan|tell me about zeeshan|who is muhammad|about muhammad/i.test(lower)) {
            return `Muhammad Zeeshan is a Computer Systems Engineering student at Mehran University of Engineering and Technology (MUET), Jamshoro. He's passionate about software development, AI/ML, and data science. He has completed multiple virtual internships and built various projects in C++, Java, and Python. He's also certified in 17 courses across different domains!`;
        }

        // Education
        if (/education|university|study|degree|college|school|b\.?e\.?|academic/i.test(lower)) {
            return `📚 **Education:**\n\n🎓 B.E. Computer Systems Engineering\n🏫 Mehran University of Engineering and Technology (MUET)\n📍 Jamshoro, Sindh, Pakistan\n📅 2025-2029\n\nMUET is one of the top engineering universities in Pakistan!`;
        }

        // Skills (general)
        if (/skills|languages|programming|coding|technologies|tech stack|what can he do/i.test(lower)) {
            return `🛠️ **Skills & Technologies:**\n\n**Languages:** C++, Java, Python\n**Web Dev:** HTML5, CSS3\n**Concepts:** OOP, Data Structures, Algorithms\n**Database:** SQL, SQLite\n**Tools:** Git, GitHub, VS Code, IntelliJ IDEA\n\n**Exploring:** AI, Machine Learning, Data Science`;
        }

        // C++
        if (/c\+\+|cpp|\bc plus/i.test(lower)) {
            return `💻 **C++:**\n\nZeeshan has strong C++ skills, demonstrated through his C++ Calculator project — a feature-rich calculator with basic arithmetic operations.\n\n🔗 GitHub: ${knowledge.projects[0].github}`;
        }

        // Java
        if (/java(?!script)/i.test(lower) && !/javascript|html|css/i.test(lower)) {
            return `☕ **Java:**\n\nZeeshan completed a Java Programming Internship at CodeAlpha where he built:\n\n🔹 Student Grade Tracker (Java Swing GUI)\n🔹 Hotel Reservation Management System\n\nHe's proficient in OOP, Swing, and Serialization.`;
        }

        // Python
        if (/python|py/i.test(lower)) {
            return `🐍 **Python:**\n\nZeeshan completed a Python Programming Internship at DecodeLabs where he built:\n\n🔹 To-Do List App\n🔹 Expense Tracker (SQLite)\n🔹 Random Password Generator\n\nHe also built a Password Strength Checker and Student Manager in Python!`;
        }

        // SQL / Database
        if (/sql|database|sqlite|db/i.test(lower)) {
            return `🗄️ **Database Skills:**\n\nZeeshan is proficient in SQL and SQLite. He used SQLite in his Expense Tracker project for persistent data storage and summary reports.`;
        }

        // HTML / CSS / Web
        if (/html|css|web dev|web develop|frontend|front-end/i.test(lower)) {
            return `🌐 **Web Development:**\n\nZeeshan knows HTML5 and CSS3 for front-end web development. He uses these technologies in his portfolio website and other web projects.`;
        }

        // OOP
        if (/oop|object.?oriented/i.test(lower)) {
            return `🎯 **Object-Oriented Programming:**\n\nOOP is one of Zeeshan's core strengths. He applied OOP principles extensively in his Java projects during the CodeAlpha internship, including the Student Grade Tracker and Hotel Reservation System.`;
        }

        // AI / ML / Data Science
        if (/ai|artificial intelligence|ml|machine learning|data science|deep learning/i.test(lower)) {
            return `🤖 **AI & Data Science:**\n\nZeeshan is actively exploring:\n\n🔹 Artificial Intelligence\n🔹 Machine Learning\n🔹 Data Science\n\nHe has an upcoming Data Science internship at Arch Technologies and holds certifications in AI/ML and Data Science.`;
        }

        // Internships (general)
        if (/internship|intern|experience|work experience|employment/i.test(lower)) {
            return `💼 **Internships:**\n\n1️⃣ **CodeAlpha** - Java Programming Intern (Virtual, 2026) ✅ Completed\n2️⃣ **DecodeLabs** - Python Programming Intern (Virtual, 2026) ✅ Completed\n3️⃣ **Arch Technologies** - Data Science Intern (Virtual, 2026) ⏳ Upcoming\n\nAsk me about any specific internship for details!`;
        }

        // CodeAlpha
        if (/codealpha|code alpha/i.test(lower)) {
            return `💼 **CodeAlpha Internship:**\n\n🏢 Company: CodeAlpha\n📋 Role: Java Programming Intern\n📍 Type: Virtual\n📅 Year: 2026\n✅ Status: Completed\n\n**Projects Built:**\n🔹 Student Grade Tracker (Java Swing GUI)\n🔹 Hotel Reservation Management System\n\n**Skills Used:** Java, Swing, OOP, Serialization`;
        }

        // DecodeLabs
        if (/decodelabs|decode labs|decode-labs/i.test(lower)) {
            return `💼 **DecodeLabs Internship:**\n\n🏢 Company: DecodeLabs\n📋 Role: Python Programming Intern\n📍 Type: Virtual\n📅 Year: 2026\n✅ Status: Completed\n\n**Projects Built:**\n🔹 To-Do List App\n🔹 Expense Tracker (SQLite)\n🔹 Random Password Generator\n\n**Skills Used:** Python, SQLite, Security`;
        }

        // Arch Technologies
        if (/arch|arch technologies/i.test(lower)) {
            return `💼 **Arch Technologies Internship:**\n\n🏢 Company: Arch Technologies\n📋 Role: Data Science Intern\n📍 Type: Virtual\n📅 Year: 2026\n⏳ Status: Upcoming\n\nThis internship is in the Data Science domain and will provide hands-on experience with real-world data science projects.`;
        }

        // Projects (general)
        if (/projects?|portfolio|work|what has he built|what did he build/i.test(lower)) {
            let msg = `🚀 **Projects (9 total):**\n\n`;
            knowledge.projects.forEach((p, i) => {
                msg += `${i + 1}️⃣ **${p.name}** (${p.lang})\n   ${p.desc}\n\n`;
            });
            msg += `Ask me about any specific project for more details!`;
            return msg;
        }

        // Calculator
        if (/calculator|calc/i.test(lower)) {
            return `🧮 **C++ Calculator:**\n\nA feature-rich calculator built in C++ with basic arithmetic operations.\n\n🔗 GitHub: ${knowledge.projects[0].github}`;
        }

        // Student Grade Tracker
        if (/grade|student grade|grade tracker/i.test(lower)) {
            return `📊 **Student Grade Tracker:**\n\nDesktop application built with Java Swing GUI featuring live statistics and report generation.\n\n🔗 GitHub: ${knowledge.projects[1].github}`;
        }

        // Hotel
        if (/hotel|reservation/i.test(lower)) {
            return `🏨 **Hotel Reservation System:**\n\nFull-featured hotel management system with dual portals and persistent storage. Built during CodeAlpha internship.\n\n🔗 GitHub: ${knowledge.projects[2].github}`;
        }

        // To-Do
        if (/todo|to-do|task manager|task list/i.test(lower)) {
            return `📝 **To-Do List App:**\n\nConsole-based task manager demonstrating Python lists. Built during DecodeLabs internship.\n\n🔗 GitHub: ${knowledge.projects[3].github}`;
        }

        // Expense
        if (/expense|spending|budget|finance/i.test(lower)) {
            return `💰 **Expense Tracker:**\n\nCLI expense tracker with SQLite persistence and summary reports. Built during DecodeLabs internship.\n\n🔗 GitHub: ${knowledge.projects[4].github}`;
        }

        // Password Generator
        if (/password gen|generate.*password|random.*password/i.test(lower)) {
            return `🔐 **Random Password Generator:**\n\nCryptographic password generator with entropy calculation. Built during DecodeLabs internship.\n\n🔗 GitHub: ${knowledge.projects[5].github}`;
        }

        // Password Checker
        if (/password.*check|check.*password|strength|password strength/i.test(lower)) {
            return `🔍 **Password Strength Checker:**\n\nCLI tool that scores passwords on a 5-star scale based on various security criteria.\n\n🔗 GitHub: ${knowledge.projects[6].github}`;
        }

        // Student Manager
        if (/student manager|manage.*student|student.*manage/i.test(lower)) {
            return `📋 **Student Manager:**\n\nInteractive CLI for managing student records. Built in Python.\n\n🔗 GitHub: ${knowledge.projects[7].github}`;
        }

        // Certifications
        if (/certificate|certification|course|courses|certified/i.test(lower)) {
            return `🏆 **Certifications:**\n\nZeeshan holds **${knowledge.certifications} certifications** across various categories:\n\n${knowledge.cert_categories.map(c => '🔹 ' + c).join('\n')}\n\nThese demonstrate his commitment to continuous learning!`;
        }

        // LinkedIn
        if (/linkedin|linked in|professional network/i.test(lower)) {
            return `💼 **LinkedIn Profile:**\n\n🔗 ${knowledge.linkedin}\n\nZeeshan has an impressive network with 2.5K+ connections and 2.5K+ followers on LinkedIn!`;
        }

        // GitHub
        if (/github|git hub|repo|repository|code repo/i.test(lower)) {
            return `💻 **GitHub Profile:**\n\n🔗 ${knowledge.github}\n\nZeeshan has multiple repositories showcasing his projects in C++, Java, and Python.`;
        }

        // Email / Contact
        if (/email|contact|reach|mail|get in touch|how to reach/i.test(lower)) {
            return `📧 **Contact Information:**\n\n✉️ Email: ${knowledge.email}\n💼 LinkedIn: ${knowledge.linkedin}\n💻 GitHub: ${knowledge.github}\n📍 Location: ${knowledge.location}`;
        }

        // Location
        if (/location|where|city|country|address|live/i.test(lower)) {
            return `📍 **Location:**\n\nZeeshan is based in ${knowledge.location}. He has completed all his internships remotely.`;
        }

        // Quick replies
        if (/what are his skills|skills\?/i.test(lower)) {
            return getResponse("skills");
        }
        if (/show me projects|projects\?/i.test(lower)) {
            return getResponse("projects");
        }
        if (/tell me about internships|internships\?/i.test(lower)) {
            return getResponse("internships");
        }
        if (/how can i contact|contact him|contact\?/i.test(lower)) {
            return getResponse("contact");
        }

        // Default
        return "I'm not sure I understand. Try asking about Zeeshan's skills, projects, internships, education, or certifications!";
    }

    // Chat UI Management

    const toggle = document.getElementById('zee-toggle');
    const chatbot = document.getElementById('zee-chatbot');
    const messages = document.getElementById('zee-messages');
    const input = document.getElementById('zee-input');
    const sendBtn = document.getElementById('zee-send');
    const closeBtn = document.getElementById('zee-close');

    let isOpen = false;
    let hasGreeted = false;

    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            chatbot.classList.add('zee-open');
            toggle.classList.add('zee-active');
            input.focus();
            if (!hasGreeted) {
                addBotMessage("Hey there! I'm Zee, Muhammad Zeeshan's AI assistant. Ask me anything about his skills, projects, internships, or education!");
                hasGreeted = true;
            }
        } else {
            chatbot.classList.remove('zee-open');
            toggle.classList.remove('zee-active');
        }
    }

    toggle.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function addBotMessage(text) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('zee-msg-wrapper', 'zee-bot');

        const avatar = document.createElement('img');
        avatar.src = 'picture.png';
        avatar.classList.add('zee-msg-avatar');
        avatar.alt = 'Zee';

        const bubble = document.createElement('div');
        bubble.classList.add('zee-msg', 'zee-bot-msg');
        bubble.innerHTML = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

        wrapper.appendChild(avatar);
        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);

        messages.querySelectorAll('.zee-quick-replies').forEach(el => el.remove());
        const quickReplies = createQuickReplies();
        messages.appendChild(quickReplies);

        scrollToBottom();
    }

    function addUserMessage(text) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('zee-msg-wrapper', 'zee-user');

        const bubble = document.createElement('div');
        bubble.classList.add('zee-msg', 'zee-user-msg');
        bubble.textContent = text;

        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('zee-msg-wrapper', 'zee-bot');
        wrapper.id = 'zee-typing';

        const avatar = document.createElement('img');
        avatar.src = 'picture.png';
        avatar.classList.add('zee-msg-avatar');
        avatar.alt = 'Zee';

        const bubble = document.createElement('div');
        bubble.classList.add('zee-msg', 'zee-bot-msg', 'zee-typing');
        bubble.innerHTML = '<span class="zee-dot"></span><span class="zee-dot"></span><span class="zee-dot"></span>';

        wrapper.appendChild(avatar);
        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('zee-typing');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function createQuickReplies() {
        const container = document.createElement('div');
        container.classList.add('zee-quick-replies');

        const options = [
            "What are his skills?",
            "Show me projects",
            "Tell me about internships",
            "How can I contact him?"
        ];

        options.forEach(text => {
            const btn = document.createElement('button');
            btn.classList.add('zee-quick-btn');
            btn.textContent = text;
            btn.addEventListener('click', () => {
                handleUserInput(text);
            });
            container.appendChild(btn);
        });

        return container;
    }

    function handleUserInput(text) {
        if (!text || !text.trim()) return;

        const userText = text.trim();
        input.value = '';
        addUserMessage(userText);

        showTypingIndicator();

        const delay = 1000 + Math.random() * 1000;
        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponse(userText);
            addBotMessage(response);
        }, delay);
    }

    sendBtn.addEventListener('click', () => {
        handleUserInput(input.value);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUserInput(input.value);
        }
    });
});
