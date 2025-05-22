import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const tools = [{ urlContext: {} }, { googleSearch: {} }];
const model = "gemini-2.0-flash";

export const createCourse = ai.chats.create({
  model,
  config: {
    tools,
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate comprehensive study material on java oops tailored for coding at a medium difficulty. The output should include:\n\nA concise course summary.\nA structured list of chapters, each with a brief chapter summary.\nFor each chapter, a detailed topic list formatted in JSON.\nEnsure the material is clear, logically organized, and appropriate for the specified course type and difficulty level.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseTitle": "Intermediate Java Object-Oriented Programming",\n  "courseSummary": "This course builds upon the foundations of Java programming and delves into the core principles of Object-Oriented Programming (OOP).  It covers essential OOP concepts like encapsulation, inheritance, polymorphism, and abstraction, along with design principles, exception handling, and working with interfaces and abstract classes. This course aims to equip you with the skills to design, implement, and maintain robust and scalable Java applications using OOP best practices.  Emphasis will be placed on practical application through coding examples and exercises suitable for intermediate-level learners.",\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Object-Oriented Programming (OOP)",\n      "chapterSummary": "This chapter revisits the fundamentals of OOP and its benefits. It introduces the core concepts of classes, objects, encapsulation, and basic class design in Java. It emphasizes the advantages of using OOP for code organization, reusability, and maintainability.",\n      "topics": [\n        {\n          "topicTitle": "Review of Fundamental Concepts",\n          "subtopics": [\n            "What is Object-Oriented Programming?",\n            "Procedural vs. Object-Oriented Approach",\n            "Advantages of OOP (Modularity, Reusability, Maintainability)"\n          ]\n        },\n        {\n          "topicTitle": "Classes and Objects",\n          "subtopics": [\n            "Definition of a Class",\n            "Creating Objects from Classes",\n            "Object State (Attributes/Fields)",\n            "Object Behavior (Methods)",\n            "Constructors: Purpose and Types (Default, Parameterized)"\n          ]\n        },\n        {\n          "topicTitle": "Encapsulation: Hiding Data and Implementation Details",\n          "subtopics": [\n            "Access Modifiers: `public`, `private`, `protected`, `default` (package-private)",\n            "Using Access Modifiers for Data Hiding",\n            "Getters and Setters (Accessor and Mutator Methods)",\n            "Benefits of Encapsulation (Data Integrity, Code Flexibility)"\n          ]\n        },\n        {\n          "topicTitle": "Basic Class Design Principles",\n          "subtopics": [\n            "Identifying Classes and Objects in a Problem Domain",\n            "Defining Attributes and Methods for Classes",\n            "Proper Naming Conventions for Classes, Methods, and Variables",\n            "Writing Clean and Readable Code"\n          ]\n        },\n         {\n          "topicTitle": "Practical Example: Designing a `BankAccount` Class",\n          "subtopics": [\n            "Defining attributes like `accountNumber`, `balance`, `accountHolderName`",\n            "Defining methods like `deposit`, `withdraw`, `getBalance`",\n            "Implementing basic error handling for insufficient funds"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "Inheritance: Extending Class Functionality",\n      "chapterSummary": "This chapter explores inheritance, a powerful mechanism for creating new classes based on existing ones. It covers single inheritance, hierarchical inheritance, method overriding, and the use of the `super` keyword.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Inheritance",\n          "subtopics": [\n            "What is Inheritance?",\n            "The \'is-a\' Relationship",\n            "Parent Class (Superclass) and Child Class (Subclass)",\n            "Benefits of Inheritance (Code Reusability, Extensibility)"\n          ]\n        },\n        {\n          "topicTitle": "Types of Inheritance (in Java)",\n          "subtopics": [\n            "Single Inheritance",\n            "Multilevel Inheritance",\n            "Hierarchical Inheritance",\n            "Multiple Inheritance (through Interfaces - covered in a later chapter)"\n          ]\n        },\n        {\n          "topicTitle": "Method Overriding",\n          "subtopics": [\n            "What is Method Overriding?",\n            "Overriding Methods in Subclasses",\n            "@Override Annotation",\n            "Rules for Method Overriding (Same Signature, Compatible Return Type, Access Modifiers)",\n            "Importance of the `@Override` Annotation"\n          ]\n        },\n        {\n          "topicTitle": "The `super` Keyword",\n          "subtopics": [\n            "Using `super` to Access Parent Class Members",\n            "Calling Parent Class Constructors using `super()`",\n            "Accessing Overridden Methods using `super`"\n          ]\n        },\n        {\n          "topicTitle": "Practical Example: Extending a `Vehicle` Class",\n          "subtopics": [\n            "Creating a `Vehicle` class with attributes like `model`, `make`, and `speed`",\n            "Creating subclasses like `Car` and `Bike` that inherit from `Vehicle`",\n            "Overriding the `accelerate` method in `Car` and `Bike`",\n            "Using `super` to call the parent class\'s `accelerate` method"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "Polymorphism: One Interface, Multiple Implementations",\n      "chapterSummary": "This chapter introduces polymorphism, the ability of an object to take on many forms. It covers both compile-time (static) polymorphism through method overloading and runtime (dynamic) polymorphism through method overriding and interfaces.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Polymorphism",\n          "subtopics": [\n            "What is Polymorphism?",\n            "The \'one interface, multiple implementations\' concept",\n            "Compile-time Polymorphism (Static Binding)",\n            "Runtime Polymorphism (Dynamic Binding)"\n          ]\n        },\n        {\n          "topicTitle": "Compile-time Polymorphism: Method Overloading",\n          "subtopics": [\n            "What is Method Overloading?",\n            "Overloading Methods with Different Parameters (Number, Type, Order)",\n            "How the Compiler Resolves Overloaded Methods"\n          ]\n        },\n        {\n          "topicTitle": "Runtime Polymorphism: Method Overriding (Revisited)",\n          "subtopics": [\n            "How Method Overriding Enables Runtime Polymorphism",\n            "Using Parent Class References to Refer to Subclass Objects",\n            "The `instanceof` Operator (and its limitations)",\n            "Dynamic Method Dispatch"\n          ]\n        },\n        {\n          "topicTitle": "Abstract Classes and Methods",\n          "subtopics": [\n            "What are Abstract Classes?",\n            "Why Use Abstract Classes?",\n            "Abstract Methods (Methods without Implementation)",\n            "Rules for Abstract Classes and Methods",\n            "Concrete Classes: Implementing Abstract Methods",\n            "When to use Abstract Classes vs. Concrete Classes"\n          ]\n        },\n        {\n          "topicTitle": "Practical Example: Shape Hierarchy with Polymorphism",\n          "subtopics": [\n            "Creating an abstract `Shape` class with an abstract `calculateArea()` method",\n            "Creating subclasses like `Circle`, `Rectangle`, and `Triangle` that extend `Shape`",\n            "Implementing the `calculateArea()` method in each subclass",\n            "Using a `Shape` array to store objects of different shape types and calculating their areas"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "Abstraction: Hiding Complexity",\n      "chapterSummary": "This chapter focuses on abstraction, the process of simplifying complex systems by modeling classes based on essential characteristics, hiding unnecessary details from the user.  It covers abstract classes, interfaces, and the differences between them.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Abstraction",\n          "subtopics": [\n            "What is Abstraction?",\n            "Hiding Complexity and Showing Essential Details",\n            "Levels of Abstraction",\n            "Importance of Abstraction in Software Design"\n          ]\n        },\n        {\n          "topicTitle": "Abstract Classes (Detailed)",\n          "subtopics": [\n            "Review: Abstract Classes and Methods",\n            "The Purpose of Abstract Classes",\n            "Restrictions on Abstract Classes",\n            "Differences Between Abstract Classes and Concrete Classes",\n            "Examples: Use cases where abstract classes are appropriate"\n          ]\n        },\n        {\n          "topicTitle": "Interfaces",\n          "subtopics": [\n            "What are Interfaces?",\n            "Defining Interfaces",\n            "Implementing Interfaces",\n            "Multiple Inheritance Through Interfaces (Achieving Multiple Inheritance in Java)",\n            "Constants in Interfaces",\n            "Default Methods in Interfaces (Java 8 and later)",\n            "Static Methods in Interfaces (Java 8 and later)",\n            "Functional Interfaces and Lambda Expressions (Introduction – to be covered in more depth later)",\n            "Marker Interfaces"\n          ]\n        },\n        {\n          "topicTitle": "Abstract Classes vs. Interfaces: Choosing the Right Approach",\n          "subtopics": [\n            "When to Use Abstract Classes?",\n            "When to Use Interfaces?",\n            "Key Differences in Implementation and Use",\n            "Considerations for Code Design and Maintainability"\n          ]\n        },\n        {\n          "topicTitle": "Practical Example: Implementing a `Flyable` Interface",\n          "subtopics": [\n            "Creating a `Flyable` interface with a `fly()` method",\n            "Implementing the `Flyable` interface in classes like `Airplane` and `Bird`",\n            "Demonstrating the use of the `Flyable` interface to work with different flying objects in a generic way"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "Exception Handling",\n      "chapterSummary": "This chapter teaches how to handle runtime errors (exceptions) gracefully in Java. It covers the `try-catch-finally` block, different types of exceptions, and creating custom exceptions.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Exception Handling",\n          "subtopics": [\n            "What are Exceptions?",\n            "Types of Errors: Compile-time Errors vs. Runtime Errors",\n            "The Importance of Exception Handling",\n            "Graceful Error Handling and Program Stability"\n          ]\n        },\n        {\n          "topicTitle": "The `try-catch-finally` Block",\n          "subtopics": [\n            "The `try` Block: Enclosing Code That Might Throw an Exception",\n            "The `catch` Block: Handling Specific Exceptions",\n            "The `finally` Block: Executing Code Regardless of Exception Outcome",\n            "Multiple `catch` Blocks (Handling Different Exception Types)",\n            "Nested `try-catch` Blocks"\n          ]\n        },\n        {\n          "topicTitle": "Types of Exceptions",\n          "subtopics": [\n            "Checked Exceptions (Compile-time Exceptions)",\n            "Unchecked Exceptions (Runtime Exceptions)",\n            "Error Exceptions (System Errors)"\n          ]\n        },\n        {\n          "topicTitle": "Exception Hierarchy",\n          "subtopics": [\n            "The `Throwable` Class",\n            "The `Exception` Class",\n            "The `RuntimeException` Class",\n            "Common Exception Classes (e.g., `IOException`, `NullPointerException`, `ArithmeticException`)",\n            "Understanding the inheritance relationships within the exception hierarchy"\n          ]\n        },\n        {\n          "topicTitle": "Throwing Exceptions",\n          "subtopics": [\n            "The `throw` Keyword",\n            "Creating and Throwing Custom Exceptions"\n          ]\n        },\n        {\n          "topicTitle": "Custom Exceptions",\n          "subtopics": [\n            "Creating Custom Exception Classes",\n            "Extending the `Exception` or `RuntimeException` Class",\n            "Providing Custom Error Messages",\n            "Use cases when creating custom exceptions is beneficial"\n          ]\n        },\n        {\n          "topicTitle": "The `throws` Clause",\n          "subtopics": [\n            "Declaring Exceptions that a Method Might Throw",\n            "Using the `throws` Clause in Method Signatures",\n            "Relationship between `throw` and `throws`"\n          ]\n        },\n        {\n          "topicTitle": "Practical Example: Handling File Input/Output Exceptions",\n          "subtopics": [\n            "Reading from a file using `FileReader` and `BufferedReader`",\n            "Handling `IOException` when the file does not exist or cannot be read",\n            "Using `finally` to ensure that resources (e.g., file streams) are closed properly",\n            "Implementing custom exception for specific file-related errors"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 6,\n      "chapterTitle": "Object-Oriented Design Principles",\n      "chapterSummary": "This chapter introduces several key Object-Oriented Design (OOD) principles, including SOLID principles, to help create maintainable, flexible, and robust software. It demonstrates how to apply these principles in Java code.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Object-Oriented Design Principles",\n          "subtopics": [\n            "What are Object-Oriented Design Principles?",\n            "Why are OOD Principles Important?",\n            "Benefits of Following OOD Principles (Maintainability, Reusability, Scalability)",\n            "Overview of Common OOD Principles"\n          ]\n        },\n        {\n          "topicTitle": "SOLID Principles (Detailed Explanation with Java Examples)",\n          "subtopics": [\n            "Single Responsibility Principle (SRP): A class should have only one reason to change.",\n            "Open/Closed Principle (OCP): Software entities should be open for extension but closed for modification.",\n            "Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types.",\n            "Interface Segregation Principle (ISP): Clients should not be forced to depend on methods they do not use.",\n            "Dependency Inversion Principle (DIP): Depend upon Abstractions. Do not depend upon concretions."\n          ]\n        },\n        {\n          "topicTitle": "Other Important OOD Principles",\n          "subtopics": [\n            "DRY (Don\'t Repeat Yourself): Avoid code duplication.",\n            "KISS (Keep It Simple, Stupid): Strive for simplicity in design and implementation.",\n            "YAGNI (You Ain\'t Gonna Need It): Don\'t add functionality until it\'s actually needed.",\n             "Law of Demeter (LoD): An object should talk only to its immediate neighbors"\n          ]\n        },\n        {\n          "topicTitle": "Applying OOD Principles in Java Code",\n          "subtopics": [\n            "Refactoring Code to Adhere to SOLID Principles",\n            "Using Abstract Classes and Interfaces to Promote Abstraction and Decoupling",\n            "Writing Unit Tests to Verify Design Correctness",\n            "Practical examples demonstrating the application of each principle."\n          ]\n        },\n        {\n          "topicTitle": "Practical Example: Refactoring a poorly designed class using SOLID principles",\n          "subtopics": [\n            "Start with a class violating multiple SOLID principles",\n            "Identify the violations",\n            "Step-by-step refactoring to adhere to each principle",\n            "Demonstrate the improved maintainability and testability of the refactored code"\n          ]\n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

export const genChapterNotes = ai.chats.create({
  model,
  config: {
    tools,
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate detailed exam preparation content for each chapter based on the given list:\n{\n"chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Acids and Bases",\n      "chapterSummary": "This chapter introduces fundamental concepts of acids and bases, including their historical development, common properties, and everyday examples. It sets the stage for understanding different acid-base theories.",\n      "topics": [\n        {\n          "topicTitle": "Historical Development of Acid-Base Concepts",\n          "subtopics": [\n            "Early observations of acids and bases",\n            "Lavoisier\'s oxygen theory of acids",\n            "Liebig\'s hydrogen theory of acids"\n          ]\n        },\n        {\n          "topicTitle": "General Properties of Acids",\n          "subtopics": [\n            "Sour taste (use caution!)",\n            "Corrosive nature",\n            "Reaction with metals to produce hydrogen gas",\n            "Litmus test (turns blue litmus red)",\n            "Neutralization of bases"\n          ]\n        },\n        {\n          "topicTitle": "General Properties of Bases",\n          "subtopics": [\n            "Bitter taste (use caution!)",\n            "Slippery feel",\n            "Litmus test (turns red litmus blue)",\n            "Neutralization of acids"\n          ]\n        },\n        {\n          "topicTitle": "Common Examples of Acids and Bases",\n          "subtopics": [\n            "Acids: Hydrochloric acid (HCl), sulfuric acid (H2SO4), acetic acid (CH3COOH)",\n            "Bases: Sodium hydroxide (NaOH), potassium hydroxide (KOH), ammonia (NH3)"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 2,\n      "chapterTitle": "Acid-Base Theories",\n      "chapterSummary": "This chapter explores the Arrhenius, Bronsted-Lowry, and Lewis acid-base theories, comparing their definitions and highlighting their applications to different chemical systems.",\n      "topics": [\n        {\n          "topicTitle": "Arrhenius Theory",\n          "subtopics": [\n            "Acid: A substance that produces H+ ions in water",\n            "Base: A substance that produces OH- ions in water",\n            "Limitations of the Arrhenius theory (applies only to aqueous solutions)"\n          ]\n        },\n        {\n          "topicTitle": "Bronsted-Lowry Theory",\n          "subtopics": [\n            "Acid: A proton (H+) donor",\n            "Base: A proton (H+) acceptor",\n            "Conjugate acid-base pairs",\n            "Amphoteric substances (can act as both acids and bases)"\n          ]\n        },\n        {\n          "topicTitle": "Lewis Theory",\n          "subtopics": [\n            "Acid: An electron pair acceptor",\n            "Base: An electron pair donor",\n            "Lewis acid-base adducts",\n            "Broader application than Arrhenius and Bronsted-Lowry theories"\n          ]\n        },\n        {\n          "topicTitle": "Comparing Acid-Base Theories",\n          "subtopics": [\n            "Strengths and weaknesses of each theory",\n            "Applicability to different chemical systems",\n            "Examples illustrating the differences between the theories"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "Acid-Base Equilibria",\n      "chapterSummary": "This chapter examines the equilibrium aspects of acid-base reactions in aqueous solutions, including the ionization of weak acids and bases, the concept of pH, and calculations involving acid-base equilibrium constants.",\n      "topics": [\n        {\n          "topicTitle": "Water Autoionization",\n          "subtopics": [\n            "The equilibrium: 2H2O(l) ⇌ H3O+(aq) + OH-(aq)",\n            "The ion-product constant for water (Kw)",\n            "Relationship between [H3O+] and [OH-]"\n          ]\n        },\n        {\n          "topicTitle": "pH Scale",\n          "subtopics": [\n            "Definition of pH and pOH",\n            "Relationship between pH and pOH (pH + pOH = 14)",\n            "Acidic, basic, and neutral solutions",\n            "Using pH indicators"\n          ]\n        },\n        {\n          "topicTitle": "Strong Acids and Strong Bases",\n          "subtopics": [\n            "Complete ionization in water",\n            "Calculating pH of strong acid and strong base solutions"\n          ]\n        },\n        {\n          "topicTitle": "Weak Acids and Weak Bases",\n          "subtopics": [\n            "Partial ionization in water",\n            "Acid ionization constant (Ka)",\n            "Base ionization constant (Kb)",\n            "Relationship between Ka and Kb for conjugate acid-base pairs (Ka * Kb = Kw)",\n            "Calculating pH of weak acid and weak base solutions using ICE tables"\n          ]\n        },\n        {\n          "topicTitle": "Percent Ionization",\n          "subtopics": [\n            "Calculating percent ionization of weak acids and bases",\n            "Factors affecting percent ionization"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "Acid-Base Titrations",\n      "chapterSummary": "This chapter focuses on acid-base titrations, a quantitative analytical technique for determining the concentration of an acid or base solution. It covers titration curves, equivalence points, and indicator selection.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Titrations",\n          "subtopics": [\n            "Definition of titration",\n            "Purpose of titration (determining concentration)",\n            "Titrant, analyte, and indicator"\n          ]\n        },\n        {\n          "topicTitle": "Titration Curves",\n          "subtopics": [\n            "Plotting pH vs. volume of titrant added",\n            "Titration curves for strong acid-strong base titrations",\n            "Titration curves for weak acid-strong base titrations",\n            "Titration curves for strong acid-weak base titrations"\n          ]\n        },\n        {\n          "topicTitle": "Equivalence Point",\n          "subtopics": [\n            "Definition of equivalence point",\n            "Determining the equivalence point from a titration curve",\n            "Stoichiometry at the equivalence point"\n          ]\n        },\n        {\n          "topicTitle": "Indicator Selection",\n          "subtopics": [\n            "Choosing an appropriate indicator for a titration",\n            "Indicator range and pH at the equivalence point",\n            "Common acid-base indicators"\n          ]\n        },\n        {\n          "topicTitle": "Calculations in Titrations",\n          "subtopics": [\n            "Calculating the concentration of an unknown solution",\n            "Using stoichiometry to determine the amount of acid or base present"\n          ]\n        }\n      ]\n    },\n    {\n      "chapterNumber": 5,\n      "chapterTitle": "Buffer Solutions",\n      "chapterSummary": "This chapter explores buffer solutions, which resist changes in pH upon addition of small amounts of acid or base. It covers the composition of buffers, buffer capacity, and the Henderson-Hasselbalch equation.",\n      "topics": [\n        {\n          "topicTitle": "Introduction to Buffer Solutions",\n          "subtopics": [\n            "Definition of a buffer solution",\n            "Importance of buffers in biological systems",\n            "Composition of a buffer solution (weak acid and its conjugate base, or weak base and its conjugate acid)"\n          ]\n        },\n        {\n          "topicTitle": "How Buffers Work",\n          "subtopics": [\n            "Mechanism of action of a buffer",\n            "Resisting changes in pH upon addition of acid or base",\n            "Neutralizing added H+ or OH- ions"\n          ]\n        },\n        {\n          "topicTitle": "Buffer Capacity",\n          "subtopics": [\n            "Definition of buffer capacity",\n            "Factors affecting buffer capacity (concentrations of the weak acid/base and its conjugate)",\n            "Range of pH over which a buffer is effective"\n          ]\n        },\n        {\n          "topicTitle": "Henderson-Hasselbalch Equation",\n          "subtopics": [\n            "Derivation of the Henderson-Hasselbalch equation",\n            "pH = pKa + log([A-]/[HA])",\n            "Using the Henderson-Hasselbalch equation to calculate pH of a buffer solution",\n            "Using the Henderson-Hasselbalch equation to prepare a buffer solution with a specific pH"\n          ]\n        },\n        {\n          "topicTitle": "Calculating pH Changes in Buffered Solutions",\n          "subtopics": [\n            "Calculating pH changes after adding small amounts of strong acid or base"\n          ]\n        }\n      ]\n    }\n  ]\n}\n\n Ensure that all topic points are covered thoroughly according to the selected difficulty level medium. The content should be structured clearly, with explanations formatted in HTML. Avoid including <html>, <head>, <body>, or <title> tags—only provide the content itself.\n\nFor each topic, include:\n\nDetailed explanations with proper formatting.\nExamples (real-world scenarios, case studies, and practical applications where applicable).\nFormulas (use the most appropriate format: LaTeX-style or plain text).\nDiagrams (AI-generated, avoid external links).\nCode Snippets (formatted properly within <pre><code> blocks, with syntax highlighting where possible).\nLists, tables, and structured formatting to enhance readability.\nIf a type is provided (exam), tailor the content accordingly. If no type is given, generate general material.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n<h2>Chapter 1: Introduction to Acids and Bases - Exam Preparation</h2>\n\n<h3>Topic: Historical Development of Acid-Base Concepts</h3>\n\n<h4>Early observations of acids and bases</h4>\n<p>Historically, acids and bases were recognized through their observable properties. Acids were noted for their sour taste (though tasting them is highly discouraged in a lab setting due to their corrosive nature) and their ability to dissolve certain substances. Bases, on the other hand, were characterized by their bitter taste (again, not to be tasted!) and slippery feel.</p>\n<p><b>Example:</b> Ancient civilizations used vinegar (acetic acid) for cleaning and preserving food. Soap, a basic substance, was known for its cleansing properties.</p>\n\n<h4>Lavoisier's oxygen theory of acids</h4>\n<p>Antoine Lavoisier proposed that oxygen was a necessary component of all acids. He believed that the presence of oxygen was what conferred acidic properties upon a substance. This theory was later proven incorrect, but it marked an early attempt to define acidity based on elemental composition.</p>\n<p><b>Limitation:</b> While many acids contain oxygen (e.g., sulfuric acid H<sub>2</sub>SO<sub>4</sub>), hydrochloric acid (HCl) does not, demonstrating that oxygen is not essential for acidity.</p>\n\n<h4>Liebig's hydrogen theory of acids</h4>\n<p>Justus von Liebig proposed that acids contained replaceable hydrogen atoms. This theory was a significant improvement over Lavoisier's. He correctly identified hydrogen as the key element responsible for acidic properties. However, this theory didn't fully explain the behavior of bases or acids in non-aqueous solutions.</p>\n<p><b>Refinement:</b> Liebig's theory laid the groundwork for later acid-base theories, highlighting the importance of hydrogen ions (H<sup>+</sup>).</p>\n\n<h3>Topic: General Properties of Acids</h3>\n\n<h4>Sour taste (use caution!)</h4>\n<p>Acids typically have a sour taste. <b>However, it's crucial to understand that tasting acids is extremely dangerous and should never be done in a laboratory or unsupervised setting.</b></p>\n<p><b>Example:</b> Lemon juice (citric acid) and vinegar (acetic acid) have a sour taste.</p>\n\n<h4>Corrosive nature</h4>\n<p>Acids are often corrosive, meaning they can damage or destroy other substances upon contact. This is due to their ability to react with and break down chemical bonds.</p>\n<p><b>Example:</b> Sulfuric acid (H<sub>2</sub>SO<sub>4</sub>) is highly corrosive and can cause severe burns.</p>\n\n<h4>Reaction with metals to produce hydrogen gas</h4>\n<p>Many acids react with certain metals to produce hydrogen gas (H<sub>2</sub>) and a metallic salt. This reaction is an example of a single displacement reaction.</p>\n<p><b>Formula:</b> Metal + Acid → Salt + Hydrogen Gas</p>\n<p><b>Example:</b> Zinc metal reacts with hydrochloric acid to produce zinc chloride and hydrogen gas:</p>\n<p>Zn(s) + 2HCl(aq) → ZnCl<sub>2</sub>(aq) + H<sub>2</sub>(g)</p>\n\n<h4>Litmus test (turns blue litmus red)</h4>\n<p>Litmus paper is a common indicator used to test for acidity and basicity. Acids turn blue litmus paper red.</p>\n<p><b>Procedure:</b> Dip a piece of blue litmus paper into the solution being tested. If the paper turns red, the solution is acidic.</p>\n\n<h4>Neutralization of bases</h4>\n<p>Acids react with bases in a process called neutralization. This reaction produces a salt and water. The pH of the resulting solution moves closer to neutral (pH 7).</p>\n<p><b>Formula:</b> Acid + Base → Salt + Water</p>\n<p><b>Example:</b> Hydrochloric acid reacts with sodium hydroxide to produce sodium chloride (table salt) and water:</p>\n<p>HCl(aq) + NaOH(aq) → NaCl(aq) + H<sub>2</sub>O(l)</p>\n\n<h3>Topic: General Properties of Bases</h3>\n\n<h4>Bitter taste (use caution!)</h4>\n<p>Bases typically have a bitter taste. <b>Like acids, tasting bases is extremely dangerous and should be avoided.</b></p>\n<p><b>Example:</b> Quinine, a component of tonic water, has a bitter taste.</p>\n\n<h4>Slippery feel</h4>\n<p>Bases often have a slippery or soapy feel to the touch. This is because they react with the oils on your skin to form soap-like substances. However, *do not* test the strength of a chemical by touching it!</p>\n<p><b>Example:</b> Soap and many cleaning products are basic and have a slippery feel.</p>\n\n<h4>Litmus test (turns red litmus blue)</h4>\n<p>Bases turn red litmus paper blue.</p>\n<p><b>Procedure:</b> Dip a piece of red litmus paper into the solution being tested. If the paper turns blue, the solution is basic.</p>\n\n<h4>Neutralization of acids</h4>\n<p>Bases react with acids in a neutralization reaction, producing a salt and water.</p>\n<p><b>Formula:</b> Acid + Base → Salt + Water</p>\n<p><b>Example:</b> Sodium hydroxide reacts with hydrochloric acid to produce sodium chloride and water:</p>\n<p>NaOH(aq) + HCl(aq) → NaCl(aq) + H<sub>2</sub>O(l)</p>\n\n<h3>Topic: Common Examples of Acids and Bases</h3>\n\n<h4>Acids: Hydrochloric acid (HCl), sulfuric acid (H2SO4), acetic acid (CH3COOH)</h4>\n<ul>\n  <li><b>Hydrochloric acid (HCl):</b> A strong acid found in gastric juice in the stomach, used in industrial cleaning and etching.</li>\n  <li><b>Sulfuric acid (H<sub>2</sub>SO<sub>4</sub>):</b> A strong acid used in fertilizers, detergents, and car batteries.</li>\n  <li><b>Acetic acid (CH<sub>3</sub>COOH):</b> A weak acid found in vinegar, used as a food preservative and flavoring agent.</li>\n</ul>\n\n<h4>Bases: Sodium hydroxide (NaOH), potassium hydroxide (KOH), ammonia (NH3)</h4>\n<ul>\n  <li><b>Sodium hydroxide (NaOH):</b> A strong base, also known as lye or caustic soda, used in soap making, drain cleaners, and paper production.</li>\n  <li><b>Potassium hydroxide (KOH):</b> A strong base used in liquid soaps, fertilizers, and alkaline batteries.</li>\n  <li><b>Ammonia (NH<sub>3</sub>):</b> A weak base used in fertilizers, cleaning products, and as a refrigerant.</li>\n</ul>\n\n<h2>Chapter 2: Acid-Base Theories - Exam Preparation</h2>\n\n<h3>Topic: Arrhenius Theory</h3>\n\n<h4>Acid: A substance that produces H+ ions in water</h4>\n<p>According to the Arrhenius theory, an acid is a substance that increases the concentration of hydrogen ions (H<sup>+</sup>) when dissolved in water. These hydrogen ions are responsible for the acidic properties of the solution.</p>\n<p><b>Example:</b> Hydrochloric acid (HCl) dissociates in water to form H<sup>+</sup> and Cl<sup>-</sup> ions:</p>\n<p>HCl(aq) → H<sup>+</sup>(aq) + Cl<sup>-</sup>(aq)</p>\n\n<h4>Base: A substance that produces OH- ions in water</h4>\n<p>An Arrhenius base is a substance that increases the concentration of hydroxide ions (OH<sup>-</sup>) when dissolved in water. These hydroxide ions are responsible for the basic properties of the solution.</p>\n<p><b>Example:</b> Sodium hydroxide (NaOH) dissociates in water to form Na<sup>+</sup> and OH<sup>-</sup> ions:</p>\n<p>NaOH(aq) → Na<sup>+</sup>(aq) + OH<sup>-</sup>(aq)</p>\n\n<h4>Limitations of the Arrhenius theory (applies only to aqueous solutions)</h4>\n<p>The Arrhenius theory has limitations because it only applies to aqueous solutions (i.e., solutions where water is the solvent). It does not explain acid-base behavior in non-aqueous solvents or reactions that do not involve H<sup>+</sup> or OH<sup>-</sup> ions.</p>\n<p><b>Example:</b> The reaction between ammonia (NH<sub>3</sub>) and hydrogen chloride (HCl) in the gas phase to form ammonium chloride (NH<sub>4</sub>Cl) is an acid-base reaction, but it doesn't involve water, so the Arrhenius theory doesn't apply.</p>\n<p>NH<sub>3</sub>(g) + HCl(g) → NH<sub>4</sub>Cl(s)</p>\n\n<h3>Topic: Bronsted-Lowry Theory</h3>\n\n<h4>Acid: A proton (H+) donor</h4>\n<p>The Bronsted-Lowry theory defines an acid as a proton (H<sup>+</sup>) donor. It is a substance that can donate a hydrogen ion to another substance.</p>\n<p><b>Example:</b> In the reaction between HCl and water, HCl donates a proton to water, making it a Bronsted-Lowry acid:</p>\n<p>HCl(aq) + H<sub>2</sub>O(l) → H<sub>3</sub>O<sup>+</sup>(aq) + Cl<sup>-</sup>(aq)</p>\n\n<h4>Base: A proton (H+) acceptor</h4>\n<p>A Bronsted-Lowry base is a proton (H<sup>+</sup>) acceptor. It is a substance that can accept a hydrogen ion from another substance.</p>\n<p><b>Example:</b> In the reaction between ammonia (NH<sub>3</sub>) and water, ammonia accepts a proton from water, making it a Bronsted-Lowry base:</p>\n<p>NH<sub>3</sub>(aq) + H<sub>2</sub>O(l) → NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq)</p>\n\n<h4>Conjugate acid-base pairs</h4>\n<p>In a Bronsted-Lowry acid-base reaction, an acid donates a proton to a base, forming a conjugate acid and a conjugate base. A conjugate acid is formed when a base accepts a proton, and a conjugate base is formed when an acid donates a proton.  The acid and base are referred to as a conjugate pair. The acid has one more H than its conjugate base.</p>\n<p><b>Example:</b></p>\n<p>HCl(aq) + H<sub>2</sub>O(l) ⇌ H<sub>3</sub>O<sup>+</sup>(aq) + Cl<sup>-</sup>(aq)</p>\n<ul>\n  <li>HCl (acid) and Cl<sup>-</sup> (conjugate base) form a conjugate pair.</li>\n  <li>H<sub>2</sub>O (base) and H<sub>3</sub>O<sup>+</sup> (conjugate acid) form a conjugate pair.</li>\n</ul>\n\n<h4>Amphoteric substances (can act as both acids and bases)</h4>\n<p>Amphoteric substances can act as both Bronsted-Lowry acids and bases, depending on the reaction conditions. Water is a classic example of an amphoteric substance.</p>\n<p><b>Example:</b> In the reaction with HCl, water acts as a base, accepting a proton to form H<sub>3</sub>O<sup>+</sup>.</p>\n<p>HCl(aq) + H<sub>2</sub>O(l) → H<sub>3</sub>O<sup>+</sup>(aq) + Cl<sup>-</sup>(aq)</p>\n<p>In the reaction with NH<sub>3</sub>, water acts as an acid, donating a proton to form OH<sup>-</sup>.</p>\n<p>NH<sub>3</sub>(aq) + H<sub>2</sub>O(l) → NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq)</p>\n\n<h3>Topic: Lewis Theory</h3>\n\n<h4>Acid: An electron pair acceptor</h4>\n<p>The Lewis theory defines an acid as an electron pair acceptor. It is a substance that can accept a pair of electrons from another substance to form a covalent bond.</p>\n<p><b>Example:</b> Boron trifluoride (BF<sub>3</sub>) is a Lewis acid because it can accept an electron pair from ammonia (NH<sub>3</sub>).</p>\n\n<h4>Base: An electron pair donor</h4>\n<p>A Lewis base is an electron pair donor. It is a substance that can donate a pair of electrons to another substance to form a covalent bond.</p>\n<p><b>Example:</b> Ammonia (NH<sub>3</sub>) is a Lewis base because it can donate its lone pair of electrons to boron trifluoride (BF<sub>3</sub>).</p>\n\n<h4>Lewis acid-base adducts</h4>\n<p>When a Lewis acid and a Lewis base react, they form a Lewis acid-base adduct, which is a compound formed by the donation of an electron pair from the base to the acid, forming a coordinate covalent bond.</p>\n<p><b>Example:</b> The reaction between BF<sub>3</sub> and NH<sub>3</sub> forms an adduct where nitrogen and boron are connected by a coordinate covalent bond.</p>\n\n<h4>Broader application than Arrhenius and Bronsted-Lowry theories</h4>\n<p>The Lewis theory has a broader application than the Arrhenius and Bronsted-Lowry theories because it is not limited to aqueous solutions or proton transfer reactions. It can explain acid-base behavior in a wider range of chemical systems, including reactions involving metal complexes and organic compounds.</p>\n<p><b>Example:</b> The reaction between a metal ion (e.g., Ag<sup>+</sup>) and ammonia (NH<sub>3</sub>) to form a complex ion ([Ag(NH<sub>3</sub>)<sub>2</sub>]<sup>+</sup>) is a Lewis acid-base reaction.</p>\n\n<h3>Topic: Comparing Acid-Base Theories</h3>\n\n<h4>Strengths and weaknesses of each theory</h4>\n<ul>\n  <li><b>Arrhenius Theory:</b> Simple and useful for understanding acid-base behavior in aqueous solutions.  However, limited to aqueous solutions and substances that produce H<sup>+</sup> or OH<sup>-</sup> ions.</li>\n  <li><b>Bronsted-Lowry Theory:</b> More general than the Arrhenius theory because it doesn't require water. Explains acid-base behavior in non-aqueous solvents.  However, it still requires proton transfer.</li>\n  <li><b>Lewis Theory:</b> Most general theory, applicable to a wide range of chemical systems, including reactions that do not involve proton transfer.  However, can be more complex to apply in some cases.</li>\n</ul>\n\n<h4>Applicability to different chemical systems</h4>\n<ul>\n  <li><b>Aqueous Solutions:</b> All three theories can be applied, but Arrhenius and Bronsted-Lowry are most commonly used.</li>\n  <li><b>Non-Aqueous Solutions:</b> Bronsted-Lowry and Lewis theories are more suitable.</li>\n  <li><b>Reactions without Proton Transfer:</b> Only the Lewis theory can be applied.</li>\n</ul>\n\n<h4>Examples illustrating the differences between the theories</h4>\n<p>Consider the following reactions:</p>\n\n<ol>\n    <li>HCl(aq) + NaOH(aq) → NaCl(aq) + H<sub>2</sub>O(l)</li>\n        <ul>\n            <li><i>Arrhenius:</i> HCl produces H<sup>+</sup>, NaOH produces OH<sup>-</sup></li>\n            <li><i>Bronsted-Lowry:</i> HCl donates H<sup>+</sup>, NaOH accepts H<sup>+</sup></li>\n            <li><i>Lewis:</i>  Not typically viewed through Lewis Theory as it's a straightforward proton transfer.</li>\n        </ul>\n    <li>NH<sub>3</sub>(g) + HCl(g) → NH<sub>4</sub>Cl(s)</li>\n         <ul>\n            <li><i>Arrhenius:</i>  Does not apply, as this reaction occurs in the gas phase, without water.</li>\n            <li><i>Bronsted-Lowry:</i>  HCl donates H<sup>+</sup>, NH<sub>3</sub> accepts H<sup>+</sup></li>\n            <li><i>Lewis:</i> NH<sub>3</sub> donates an electron pair to H<sup>+</sup>.</li>\n        </ul>\n    <li>BF<sub>3</sub> + NH<sub>3</sub> → F<sub>3</sub>B-NH<sub>3</sub></li>\n         <ul>\n            <li><i>Arrhenius:</i> Does not apply, as this reaction does not occur in water.</li>\n            <li><i>Bronsted-Lowry:</i> Does not apply, as there is no proton transfer.</li>\n            <li><i>Lewis:</i> BF<sub>3</sub> accepts an electron pair from NH<sub>3</sub>.</li>\n        </ul>\n</ol>\n\n<h2>Chapter 3: Acid-Base Equilibria - Exam Preparation</h2>\n\n<h3>Topic: Water Autoionization</h3>\n\n<h4>The equilibrium: 2H2O(l) ⇌ H3O+(aq) + OH-(aq)</h4>\n<p>Water undergoes a self-ionization process, where it acts as both an acid and a base. One water molecule donates a proton (H<sup>+</sup>) to another, forming a hydronium ion (H<sub>3</sub>O<sup>+</sup>) and a hydroxide ion (OH<sup>-</sup>).</p>\n\n<h4>The ion-product constant for water (Kw)</h4>\n<p>The ion-product constant for water (K<sub>w</sub>) is the equilibrium constant for the autoionization of water. It represents the product of the concentrations of hydronium and hydroxide ions at a given temperature.</p>\n<p><b>Formula:</b> K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>-</sup>]</p>\n<p>At 25°C, K<sub>w</sub> = 1.0 x 10<sup>-14</sup>.</p>\n\n<h4>Relationship between [H3O+] and [OH-]</h4>\n<p>In pure water, the concentrations of hydronium and hydroxide ions are equal. When an acid is added, [H<sub>3</sub>O<sup>+</sup>] increases, and [OH<sup>-</sup>] decreases to maintain the K<sub>w</sub> value. Conversely, when a base is added, [OH<sup>-</sup>] increases, and [H<sub>3</sub>O<sup>+</sup>] decreases.</p>\n<p><b>Relationship:</b> [H<sub>3</sub>O<sup>+</sup>] = K<sub>w</sub> / [OH<sup>-</sup>] and [OH<sup>-</sup>] = K<sub>w</sub> / [H<sub>3</sub>O<sup>+</sup>]</p>\n\n<h3>Topic: pH Scale</h3>\n\n<h4>Definition of pH and pOH</h4>\n<p>pH is a measure of the acidity or basicity of a solution. It is defined as the negative base-10 logarithm of the hydronium ion concentration.</p>\n<p><b>Formula:</b> pH = -log[H<sub>3</sub>O<sup>+</sup>]</p>\n<p>pOH is a measure of the hydroxide ion concentration. It is defined as the negative base-10 logarithm of the hydroxide ion concentration.</p>\n<p><b>Formula:</b> pOH = -log[OH<sup>-</sup>]</p>\n\n<h4>Relationship between pH and pOH (pH + pOH = 14)</h4>\n<p>At 25°C, the sum of pH and pOH is always equal to 14.</p>\n<p><b>Formula:</b> pH + pOH = 14</p>\n<p>This relationship is derived from the K<sub>w</sub> value: K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>-</sup>] = 1.0 x 10<sup>-14</sup>. Taking the negative logarithm of both sides gives pH + pOH = 14.</p>\n\n<h4>Acidic, basic, and neutral solutions</h4>\n<ul>\n  <li><b>Acidic solutions:</b> pH < 7</li>\n  <li><b>Basic solutions:</b> pH > 7</li>\n  <li><b>Neutral solutions:</b> pH = 7</li>\n</ul>\n\n<h4>Using pH indicators</h4>\n<p>pH indicators are substances that change color depending on the pH of the solution. They are used to visually determine the approximate pH of a solution.</p>\n<p><b>Examples:</b> Litmus paper, phenolphthalein, methyl orange.</p>\n<p><b>How they work:</b> Each indicator has a specific pH range over which it changes color. The color change occurs when the indicator molecule either gains or loses a proton, altering its electronic structure and thus its color.</p>\n\n<h3>Topic: Strong Acids and Strong Bases</h3>\n\n<h4>Complete ionization in water</h4>\n<p>Strong acids and strong bases completely dissociate or ionize in water, meaning that virtually all of the acid or base molecules break apart into ions.</p>\n<p><b>Example:</b> Hydrochloric acid (HCl) completely dissociates in water:</p>\n<p>HCl(aq) → H<sup>+</sup>(aq) + Cl<sup>-</sup>(aq)</p>\n<p>Sodium hydroxide (NaOH) completely dissociates in water:</p>\n<p>NaOH(aq) → Na<sup>+</sup>(aq) + OH<sup>-</sup>(aq)</p>\n\n<h4>Calculating pH of strong acid and strong base solutions</h4>\n<p>Since strong acids and bases completely ionize, the concentration of H<sup>+</sup> or OH<sup>-</sup> is equal to the initial concentration of the acid or base.</p>\n<p><b>For Strong Acids:</b> [H<sub>3</sub>O<sup>+</sup>] = [Acid], so pH = -log[Acid]</p>\n<p><b>For Strong Bases:</b> [OH<sup>-</sup>] = [Base], so pOH = -log[Base], and pH = 14 - pOH</p>\n<p><b>Example:</b> What is the pH of a 0.01 M solution of hydrochloric acid (HCl)?</p>\n<p>[H<sub>3</sub>O<sup>+</sup>] = 0.01 M</p>\n<p>pH = -log(0.01) = 2</p>\n\n<h3>Topic: Weak Acids and Weak Bases</h3>\n\n<h4>Partial ionization in water</h4>\n<p>Weak acids and weak bases only partially ionize in water, meaning that only a fraction of the acid or base molecules break apart into ions. At equilibrium, there will be a mixture of both the non-ionized acid or base and its ions.</p>\n<p><b>Example:</b> Acetic acid (CH<sub>3</sub>COOH) partially dissociates in water:</p>\n<p>CH<sub>3</sub>COOH(aq) ⇌ H<sup>+</sup>(aq) + CH<sub>3</sub>COO<sup>-</sup>(aq)</p>\n<p>Ammonia (NH<sub>3</sub>) partially reacts with water:</p>\n<p>NH<sub>3</sub>(aq) + H<sub>2</sub>O(l) ⇌ NH<sub>4</sub><sup>+</sup>(aq) + OH<sup>-</sup>(aq)</p>\n\n<h4>Acid ionization constant (Ka)</h4>\n<p>The acid ionization constant (K<sub>a</sub>) is the equilibrium constant for the ionization of a weak acid in water. It measures the strength of the acid; higher K<sub>a</sub> values indicate a stronger acid (more ionization).</p>\n<p><b>Formula:</b> K<sub>a</sub> = [H<sub>3</sub>O<sup>+</sup>][A<sup>-</sup>] / [HA], where HA is the weak acid and A<sup>-</sup> is its conjugate base.</p>\n\n<h4>Base ionization constant (Kb)</h4>\n<p>The base ionization constant (K<sub>b</sub>) is the equilibrium constant for the ionization of a weak base in water. It measures the strength of the base; higher K<sub>b</sub> values indicate a stronger base (more ionization).</p>\n<p><b>Formula:</b> K<sub>b</sub> = [BH<sup>+</sup>][OH<sup>-</sup>] / [B], where B is the weak base and BH<sup>+</sup> is its conjugate acid.</p>\n\n<h4>Relationship between Ka and Kb for conjugate acid-base pairs (Ka * Kb = Kw)</h4>\n<p>For a conjugate acid-base pair, the product of the acid ionization constant (K<sub>a</sub>) and the base ionization constant (K<sub>b</sub>) is equal to the ion-product constant for water (K<sub>w</sub>).</p>\n<p><b>Formula:</b> K<sub>a</sub> * K<sub>b</sub> = K<sub>w</sub></p>\n<p>This relationship allows you to calculate the K<sub>b</sub> value for a conjugate base if you know the K<sub>a</sub> value for its conjugate acid, and vice versa.</p>\n\n<h4>Calculating pH of weak acid and weak base solutions using ICE tables</h4>\n<p>ICE tables (Initial, Change, Equilibrium) are used to calculate the equilibrium concentrations of ions in weak acid and weak base solutions.  These are then used to calculate pH.</p>\n\n<p><b>Steps:</b></p>\n<ol>\n  <li>Write the balanced equilibrium equation.</li>\n  <li>Set up the ICE table:\n     <ul>\n       <li>Initial: Write the initial concentrations of the acid/base and its ions.</li>\n       <li>Change:  Determine the change in concentration (usually \"+x\" or \"-x\").</li>\n       <li>Equilibrium: Write the equilibrium concentrations (Initial + Change).</li>\n     </ul>\n  </li>\n  <li>Write the expression for K<sub>a</sub> or K<sub>b</sub> and substitute the equilibrium concentrations from the ICE table.</li>\n  <li>Solve for x.  (If K<sub>a</sub> or K<sub>b</sub> is small, you can often approximate that x is negligible compared to the initial concentration).</li>\n  <li>Calculate [H<sub>3</sub>O<sup>+</sup>] or [OH<sup>-</sup>] from x.</li>\n  <li>Calculate pH or pOH.</li>\n</ol>\n\n<p><b>Example:</b> Calculate the pH of a 0.1 M solution of acetic acid (CH<sub>3</sub>COOH), given that K<sub>a</sub> = 1.8 x 10<sup>-5</sup>.</p>\n\n<pre><code>\nCH3COOH(aq)  ⇌   H+(aq)   +   CH3COO-(aq)\nI     0.1             0          0\nC     -x             +x         +x\nE   0.1 - x           x          x\n\nKa = [H+][CH3COO-] / [CH3COOH]\n1.  8 x 10^-5 = x*x / (0.1 - x)\n\nAssume x is small compared to 0.1, so 0.1 - x ≈ 0.1\n1.  8 x 10^-5 = x^2 / 0.1\nx^2 = 1.8 x 10^-6\nx = 1.34 x 10^-3\n\n[H+] = x = 1.34 x 10^-3 M\npH = -log(1.34 x 10^-3) = 2.87\n</code></pre>\n\n<h3>Topic: Percent Ionization</h3>\n\n<h4>Calculating percent ionization of weak acids and bases</h4>\n<p>Percent ionization is the percentage of acid or base molecules that ionize in solution. It is calculated by dividing the concentration of ions formed at equilibrium by the initial concentration of the acid or base, and then multiplying by 100%.</p>\n<p><b>Formula:</b></p>\n<ul>\n  <li>Percent Ionization (Acid) = ([H<sub>3</sub>O<sup>+</sup>] / [HA]<sub>initial</sub>) * 100%</li>\n  <li>Percent Ionization (Base) = ([OH<sup>-</sup>] / [B]<sub>initial</sub>) * 100%</li>\n</ul>\n\n<h4>Factors affecting percent ionization</h4>\n<ul>\n  <li><b>Initial concentration:</b> Percent ionization decreases as the initial concentration of the weak acid or base increases. This is due to Le Chatelier's principle; as the concentration of the acid/base increases, the equilibrium shifts towards the non-ionized form.</li>\n  <li><b>Temperature:</b> Changes in temperature can affect the equilibrium constant (K<sub>a</sub> or K<sub>b</sub>), which in turn affects the percent ionization.</li>\n  <li><b>Presence of common ions:</b> The presence of a common ion (an ion already present in the solution) decreases the percent ionization of the weak acid or base (Common Ion Effect).</li>\n</ul>\n\n<h2>Chapter 4: Acid-Base Titrations - Exam Preparation</h2>\n\n<h3>Topic: Introduction to Titrations</h3>\n\n<h4>Definition of titration</h4>\n<p>Titration is a quantitative analytical technique used to determine the concentration of a substance (analyte) by reacting it with a solution of known concentration (titrant).</p>\n\n<h4>Purpose of titration (determining concentration)</h4>\n<p>The main purpose of titration is to accurately determine the concentration of an unknown solution by carefully reacting it with a solution of known concentration. This is done by measuring the volume of titrant required to completely react with the analyte.</p>\n\n<h4>Titrant, analyte, and indicator</h4>\n<ul>\n  <li><b>Titrant:</b> A solution of known concentration that is added to the analyte in the titration. Also known as the standard solution.</li>\n  <li><b>Analyte:</b> The solution of unknown concentration that is being titrated.</li>\n  <li><b>Indicator:</b> A substance that changes color at or near the equivalence point of the titration, allowing the endpoint to be visually determined.</li>\n</ul>\n\n<h3>Topic: Titration Curves</h3>\n\n<h4>Plotting pH vs. volume of titrant added</h4>\n<p>A titration curve is a graph that plots the pH of the solution being titrated against the volume of titrant added. Titration curves provide valuable information about the progress of the titration, including the equivalence point and the buffering region (if applicable).</p>\n\n<h4>Titration curves for strong acid-strong base titrations</h4>\n<p>In a strong acid-strong base titration, the pH changes gradually at first, then experiences a very sharp increase or decrease near the equivalence point. The equivalence point occurs at pH 7 because the reaction produces a neutral salt and water.</p>\n\n<h4>Titration curves for weak acid-strong base titrations</h4>\n<p>In a weak acid-strong base titration, the initial pH is higher than in a strong acid titration. The titration curve has a buffering region before the equivalence point, where the pH changes gradually. The equivalence point occurs at a pH greater than 7 because the conjugate base of the weak acid hydrolyzes (reacts with water) to produce hydroxide ions.</p>\n\n<h4>Titration curves for strong acid-weak base titrations</h4>\n<p>In a strong acid-weak base titration, the initial pH is lower than in a strong base titration. The titration curve has a buffering region before the equivalence point. The equivalence point occurs at a pH less than 7 because the conjugate acid of the weak base hydrolyzes to produce hydronium ions.</p>\n\n<h3>Topic: Equivalence Point</h3>\n\n<h4>Definition of equivalence point</h4>\n<p>The equivalence point in a titration is the point at which the amount of titrant added is stoichiometrically equivalent to the amount of analyte in the solution. In other words, the moles of titrant added equals the moles of analyte present (taking into account any stoichiometric coefficients).</p>\n\n<h4>Determining the equivalence point from a titration curve</h4>\n<p>The equivalence point can be determined from a titration curve by finding the point where the pH changes most rapidly (steepest slope). This is often the inflection point of the curve. For strong acid-strong base titrations, the equivalence point is at pH 7. For weak acid-strong base titrations, it's above 7, and for strong acid-weak base titrations, it's below 7.</p>\n\n<h4>Stoichiometry at the equivalence point</h4>\n<p>At the equivalence point, the moles of acid are equal to the moles of base, taking into account the stoichiometry of the reaction.</p>\n<p><b>Formula:</b> moles of acid = moles of base (or moles of acid * stoichiometric coefficient = moles of base * stoichiometric coefficient)</p>\n<p>This allows you to determine the concentration of the unknown solution using the known concentration of the titrant and the volumes of both solutions.</p>\n\n<h3>Topic: Indicator Selection</h3>\n\n<h4>Choosing an appropriate indicator for a titration</h4>\n<p>Selecting the right indicator is crucial for an accurate titration. The indicator should change color as close as possible to the equivalence point. The pH range of the indicator should overlap with the steep portion of the titration curve near the equivalence point.</p>\n\n<h4>Indicator range and pH at the equivalence point</h4>\n<p>Each indicator has a specific pH range over which it changes color. The ideal indicator has a color change range that includes the pH at the equivalence point. For example, phenolphthalein has a color change range of 8.3 - 10.0, making it suitable for titrations where the equivalence point is around pH 9.</p>\n\n<h4>Common acid-base indicators</h4>\n<ul>\n  <li><b>Phenolphthalein:</b> Colorless in acidic solutions, pink in basic solutions (pH range: 8.3 - 10.0).</li>\n  <li><b>Methyl Orange:</b> Red in acidic solutions, yellow in basic solutions (pH range: 3.1 - 4.4).</li>\n  <li><b>Bromothymol Blue:</b> Yellow in acidic solutions, blue in basic solutions (pH range: 6.0 - 7.6).  Ideal for titrations with a near-neutral equivalence point.</li>\n</ul>\n\n<h3>Topic: Calculations in Titrations</h3>\n\n<h4>Calculating the concentration of an unknown solution</h4>\n<p>To calculate the concentration of an unknown solution, use the following formula:</p>\n<p>M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub></p>\n<p>Where:</p>\n<ul>\n  <li>M<sub>1</sub> = Molarity of the titrant (known)</li>\n  <li>V<sub>1</sub> = Volume of the titrant used</li>\n  <li>M<sub>2</sub> = Molarity of the analyte (unknown)</li>\n  <li>V<sub>2</sub> = Volume of the analyte</li>\n</ul>\n<p>This formula applies when the stoichiometric ratio between the acid and base is 1:1. If the ratio is different, you need to adjust the formula accordingly.</p>\n\n<h4>Using stoichiometry to determine the amount of acid or base present</h4>\n<p>At the equivalence point, the moles of acid and base are stoichiometrically equivalent. Use the balanced chemical equation to determine the mole ratio between the acid and base.</p>\n<p><b>Example:</b> Consider the titration of sulfuric acid (H<sub>2</sub>SO<sub>4</sub>) with sodium hydroxide (NaOH):</p>\n<p>H<sub>2</sub>SO<sub>4</sub>(aq) + 2NaOH(aq) → Na<sub>2</sub>SO<sub>4</sub>(aq) + 2H<sub>2</sub>O(l)</p>\n<p>In this reaction, 1 mole of H<sub>2</sub>SO<sub>4</sub> reacts with 2 moles of NaOH.  Therefore, at the equivalence point, moles H<sub>2</sub>SO<sub>4</sub> * 2 = moles NaOH.</p>\n\n<h2>Chapter 5: Buffer Solutions - Exam Preparation</h2>\n\n<h3>Topic: Introduction to Buffer Solutions</h3>\n\n<h4>Definition of a buffer solution</h4>\n<p>A buffer solution is an aqueous solution that resists changes in pH upon the addition of small amounts of acid or base. This ability to resist pH changes is crucial in many chemical and biological systems.</p>\n\n<h4>Importance of buffers in biological systems</h4>\n<p>Buffers are essential in biological systems to maintain a stable pH, which is crucial for the proper functioning of enzymes and other biological molecules. For example, blood contains several buffer systems that maintain the pH within a narrow range (7.35 - 7.45).</p>\n\n<h4>Composition of a buffer solution (weak acid and its conjugate base, or weak base and its conjugate acid)</h4>\n<p>A buffer solution typically consists of:</p>\n<ul>\n  <li>A weak acid and its conjugate base (e.g., acetic acid (CH<sub>3</sub>COOH) and acetate ion (CH<sub>3</sub>COO<sup>-</sup>)).</li>\n  <li>A weak base and its conjugate acid (e.g., ammonia (NH<sub>3</sub>) and ammonium ion (NH<sub>4</sub><sup>+</sup>)).</li>\n</ul>\n\n<h3>Topic: How Buffers Work</h3>\n\n<h4>Mechanism of action of a buffer</h4>\n<p>A buffer works by neutralizing small amounts of added acid or base. The weak acid component of the buffer neutralizes added base, while the conjugate base component neutralizes added acid.</p>\n\n<h4>Resisting changes in pH upon addition of acid or base</h4>\n<p>When acid (H<sup>+</sup>) is added to a buffer solution, the conjugate base reacts with it, converting it to the weak acid and minimizing the pH change.</p>\n<p>A<sup>-</sup>(aq) + H<sup>+</sup>(aq) → HA(aq)</p>\n<p>When base (OH<sup>-</sup>) is added to a buffer solution, the weak acid reacts with it, converting it to the conjugate base and minimizing the pH change.</p>\n<p>HA(aq) + OH<sup>-</sup>(aq) → A<sup>-</sup>(aq) + H<sub>2</sub>O(l)</p>\n\n<h4>Neutralizing added H+ or OH- ions</h4>\n<p>The buffer components react with the added H<sup>+</sup> or OH<sup>-</sup> ions, preventing them from significantly altering the pH of the solution. The buffer's ability to neutralize these ions is limited by the concentrations of the weak acid and conjugate base.</p>\n\n<h3>Topic: Buffer Capacity</h3>\n\n<h4>Definition of buffer capacity</h4>\n<p>Buffer capacity is the amount of acid or base that a buffer solution can neutralize before the pH begins to change significantly. It is a measure of the effectiveness of the buffer.</p>\n\n<h4>Factors affecting buffer capacity (concentrations of the weak acid/base and its conjugate)</h4>\n<p>",
        },
      ],
    },
  ],
});

export const genFlashCards = ai.chats.create({
  model,
  config: {
    tools,
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate up to 15 flashcards based on the main topic: Java oops, using the following subtopics for context: [Fundamentals of Object-Oriented Programming, Inheritance and Polymorphism, Interfaces and Abstract Classes, Exception Handling, Object-Oriented Design Principles]. Format the output as a JSON array, where each flashcard includes a front and back field. The overall complexity level of the flashcards is Medium (easy, medium, hard). Tailor the content to the following use-case: coding (coding, job, exam, general). Keep the flashcards concise and focused on quick review. Avoid including examples or diagrams unless absolutely necessary.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `[
            {
              "front": "What are the four pillars of OOP?",
              "back": "Abstraction, Encapsulation, Inheritance, Polymorphism"
            },
            {
              "front": "Define Encapsulation.",
              "back": "Bundling data (attributes) and methods that operate on the data within a class, hiding the internal state of an object."
            },
            {
              "front": "What is Inheritance?",
              "back": "A mechanism where a new class (subclass) inherits properties and behaviors from an existing class (superclass)."
            },
            {
              "front": "Explain Polymorphism.",
              "back": "The ability of an object to take on many forms; using a single interface to represent different underlying forms (method overloading and overriding)."
            },
            {
              "front": "What is method overriding?",
              "back": "A subclass provides a specific implementation for a method that is already defined in its superclass."
            },
            {
              "front": "What is method overloading?",
              "back": "Defining multiple methods in the same class with the same name but different parameters."
            },
            {
              "front": "What is an Interface?",
              "back": "A contract that specifies a set of methods that a class must implement. It defines 'what' to do, not 'how'."
            },
            {
              "front": "What is an Abstract Class?",
              "back": "A class that cannot be instantiated and may contain abstract methods (methods without implementation)."
            },
            {
              "front": "Difference between Interface and Abstract Class.",
              "back": "Interface provides full abstraction (all methods are abstract), while Abstract Class provides partial abstraction (can have concrete methods)."
            },
            {
              "front": "What is Exception Handling?",
              "back": "A mechanism to handle runtime errors and maintain the program's flow. Using try-catch-finally blocks."
            },
            {
              "front": "What are checked vs. unchecked exceptions?",
              "back": "Checked exceptions must be handled or declared, unchecked exceptions do not need to be. (Checked are subclasses of Exception, Unchecked are subclasses of RuntimeException)"
            },
            {
              "front": "What is the purpose of the 'finally' block?",
              "back": "It guarantees that a block of code is executed regardless of whether an exception is thrown or caught."
            },
            {
              "front": "What is the Single Responsibility Principle (SRP)?",
              "back": "A class should have only one reason to change."
            },
            {
              "front": "What is the Open/Closed Principle (OCP)?",
              "back": "Software entities should be open for extension, but closed for modification."
            },
            {
              "front": "What is the Liskov Substitution Principle (LSP)?",
              "back": "Subtypes must be substitutable for their base types without altering the correctness of the program."
            }
          ]`,
        },
      ],
    },
  ],
});

export const genQuizContent = ai.chats.create({
  model,
  config: {
    tools,
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Task:
          Generate up to 10 multiple-choice questions (MCQs) focused on the main topic: Intermediate C++ File Handling.
          Use the following subtopics for additional context: [
              {
                "chapterNumber": 1,
                "chapterTitle": "Introduction to File Handling in C++",
                "chapterSummary": "This chapter provides an overview of file handling in C++. It covers the basics of file streams, different file types, and the necessary header files for file I/O operations. It emphasizes the importance of file handling for data persistence and storage.",
                "topics": [
                  {
                    "topicTitle": "Fundamentals of File Handling",
                    "subtopics": [
                      "What is File Handling?",
                      "Importance of File Handling (Data Persistence, Storage, and Retrieval)",
                      "File Types: Text Files vs. Binary Files",
                      "File Streams: \`ifstream\` (Input), \`ofstream\` (Output), \`fstream\` (Input/Output)"
                    ]
                  },
                  {
                    "topicTitle": "Header Files for File I/O",
                    "subtopics": [
                      "\`fstream\` Header: Including the necessary file streams",
                      "Standard Library Namespace (\`std\`)",
                      "Other relevant headers if required for advanced operations"
                    ]
                  },
                  {
                    "topicTitle": "Opening and Closing Files",
                    "subtopics": [
                      "Opening Files using Constructors of \`ifstream\`, \`ofstream\`, and \`fstream\`",
                      "File Modes: \`ios::in\`, \`ios::out\`, \`ios::app\`, \`ios::trunc\`, \`ios::binary\`",
                      "Combining File Modes (e.g., \`ios::out | ios::binary\`)",
                      "Closing Files using \`close()\` method"
                    ]
                  },
                  {
                    "topicTitle": "Checking File Status",
                    "subtopics": [
                      "\`is_open()\`: Checking if a file is successfully opened",
                      "\`fail()\`: Checking for general errors during file operations",
                      "\`bad()\`: Checking for severe errors (e.g., hardware failure)",
                      "\`eof()\`: Checking for end-of-file condition"
                    ]
                  },
                  {
                    "topicTitle": "Simple Example: Writing to a Text File",
                    "subtopics": [
                      "Creating an \`ofstream\` object",
                      "Opening a file in \`ios::out\` mode",
                      "Writing data to the file using the \`<<\` operator",
                      "Closing the file"
                    ]
                  }
                ]
              },
              {
                "chapterNumber": 2,
                "chapterTitle": "Reading from and Writing to Text Files",
                "chapterSummary": "This chapter focuses on reading data from and writing data to text files using different techniques. It covers character-by-character, line-by-line, and formatted I/O, providing examples for each method.",
                "topics": [
                  {
                    "topicTitle": "Writing to Text Files",
                    "subtopics": [
                      "Using the \`<<\` Operator for Formatted Output",
                      "Writing Characters: \`put()\` method",
                      "Writing Lines: \`write()\` method (with length specification)",
                      "Formatting Output (using manipulators like \`setw\`, \`setprecision\`, \`fixed\`)",
                      "Writing Multiple Data Types to a File"
                    ]
                  },
                  {
                    "topicTitle": "Reading from Text Files",
                    "subtopics": [
                      "Using the \`>>\` Operator for Formatted Input",
                      "Reading Characters: \`get()\` method",
                      "Reading Lines: \`getline()\` function",
                      "Handling Whitespace (using \`ws\` manipulator)",
                      "Reading Multiple Data Types from a File"
                    ]
                  },
                  {
                    "topicTitle": "Character-by-Character I/O",
                    "subtopics": [
                      "Reading a single character using \`get()\`",
                      "Writing a single character using \`put()\`",
                      "Handling end-of-line characters",
                      "Practical use cases for character-by-character processing"
                    ]
                  },
                  {
                    "topicTitle": "Line-by-Line I/O",
                    "subtopics": [
                      "Reading a line using \`getline()\`",
                      "Writing a line using \`write()\` or \`<<\` with \`endl\`",
                      "Handling long lines and buffer overflow",
                      "Practical use cases for line-by-line processing (e.g., configuration files)"
                    ]
                  },
                  {
                    "topicTitle": "Formatted I/O",
                    "subtopics": [
                      "Using stream manipulators for formatting (e.g., \`setw\`, \`setprecision\`, \`fixed\`, \`left\`, \`right\`)",
                      "Reading and writing data in specific formats",
                      "Example: Storing and retrieving tabular data in a text file"
                    ]
                  },
                  {
                    "topicTitle": "Example: Reading and Processing a CSV File",
                    "subtopics": [
                      "Reading data from a comma-separated value (CSV) file",
                      "Parsing each line into individual fields",
                      "Handling different data types in CSV file",
                      "Error handling for malformed CSV entries"
                    ]
                  }
                ]
              },
              {
                "chapterNumber": 3,
                "chapterTitle": "Working with Binary Files",
                "chapterSummary": "This chapter explores binary file handling, focusing on reading and writing raw bytes of data. It covers the advantages of binary files, techniques for reading and writing structures and objects, and considerations for platform independence.",
                "topics": [
                  {
                    "topicTitle": "Introduction to Binary Files",
                    "subtopics": [
                      "What are Binary Files?",
                      "Differences between Text Files and Binary Files",
                      "Advantages of Binary Files (Efficiency, Storage Space, Data Integrity)",
                      "Using \`ios::binary\` Mode"
                    ]
                  },
                  {
                    "topicTitle": "Reading from Binary Files",
                    "subtopics": [
                      "Using \`read()\` method (specifying the number of bytes to read)",
                      "Reading Raw Bytes",
                      "Reading Structures and Objects",
                      "Handling End-of-File (EOF)"
                    ]
                  },
                  {
                    "topicTitle": "Writing to Binary Files",
                    "subtopics": [
                      "Using \`write()\` method (specifying the number of bytes to write)",
                      "Writing Raw Bytes",
                      "Writing Structures and Objects",
                      "Padding Structures for Proper Alignment"
                    ]
                  },
                  {
                    "topicTitle": "Reading and Writing Structures/Objects",
                    "subtopics": [
                      "Casting Pointers to \`char*\` for \`read()\` and \`write()\`",
                      "Ensuring Proper Alignment of Data Structures",
                      "Considerations for Platform Independence (Endianness)",
                      "Using \`sizeof()\` to Determine Object Size"
                    ]
                  },
                  {
                    "topicTitle": "Example: Storing and Retrieving a Student Record",
                    "subtopics": [
                      "Defining a \`Student\` structure (name, ID, GPA)",
                      "Writing a \`Student\` object to a binary file",
                      "Reading a \`Student\` object from a binary file",
                      "Error handling for file I/O operations"
                    ]
                  }
                ]
              },
              {
                "chapterNumber": 4,
                "chapterTitle": "File Positioning and Random Access",
                "chapterSummary": "This chapter covers file positioning techniques, allowing you to move the file pointer to specific locations for reading or writing. It introduces the \`seekg()\` and \`seekp()\` methods and demonstrates how to implement random access file operations.",
                "topics": [
                  {
                    "topicTitle": "Understanding File Pointers",
                    "subtopics": [
                      "What are File Pointers?",
                      "Input File Pointer (get pointer)",
                      "Output File Pointer (put pointer)",
                      "Default Positions of File Pointers"
                    ]
                  },
                  {
                    "topicTitle": "\`seekg()\` and \`seekp()\` Methods",
                    "subtopics": [
                      "\`seekg()\`: Positioning the input file pointer (for reading)",
                      "\`seekp()\`: Positioning the output file pointer (for writing)",
                      "Syntax: \`seekg(offset, origin)\` and \`seekp(offset, origin)\`",
                      "Offset: Number of bytes to move the pointer",
                      "Origin: \`ios::beg\` (beginning), \`ios::cur\` (current), \`ios::end\` (end)"
                    ]
                  },
                  {
                    "topicTitle": "\`tellg()\` and \`tellp()\` Methods",
                    "subtopics": [
                      "\`tellg()\`: Returning the current position of the input file pointer",
                      "\`tellp()\`: Returning the current position of the output file pointer",
                      "Use cases for \`tellg()\` and \`tellp()\` (e.g., saving file positions)"
                    ]
                  },
                  {
                    "topicTitle": "Random Access File Operations",
                    "subtopics": [
                      "Reading Data from Specific Locations in a File",
                      "Writing Data to Specific Locations in a File",
                      "Updating Records in a File",
                      "Implementing a Simple Indexing System"
                    ]
                  },
                  {
                    "topicTitle": "Example: Reading a Specific Record from a File",
                    "subtopics": [
                      "Determining the offset for a specific record",
                      "Using \`seekg()\` to move the file pointer to the record's location",
                      "Reading the record's data",
                      "Error handling for invalid record numbers"
                    ]
                  }
                ]
              },
              {
                "chapterNumber": 5,
                "chapterTitle": "Error Handling and Exception Safety",
                "chapterSummary": "This chapter focuses on robust error handling techniques for file I/O operations. It covers checking file status flags, handling exceptions, and ensuring that resources (e.g., file streams) are properly released, even in the presence of errors.",
                "topics": [
                  {
                    "topicTitle": "File Status Flags",
                    "subtopics": [
                      "\`fail()\`: Checking for general errors during file operations",
                      "\`bad()\`: Checking for severe errors (e.g., hardware failure)",
                      "\`eof()\`: Checking for end-of-file condition",
                      "\`good()\`: Checking if the file stream is in a good state",
                      "Clearing Error Flags using \`clear()\`"
                    ]
                  },
                  {
                    "topicTitle": "Exception Handling with \`try-catch\` Blocks",
                    "subtopics": [
                      "Using \`try-catch\` blocks to handle file I/O exceptions",
                      "Exception Types: \`ios_base::failure\` (thrown when a file operation fails)",
                      "Catching Specific Exceptions vs. Catching a General Exception",
                      "Rethrowing Exceptions"
                    ]
                  },
                  {
                    "topicTitle": "Resource Management (RAII)",
                    "subtopics": [
                      "What is Resource Acquisition Is Initialization (RAII)?",
                      "Using RAII to ensure that file streams are closed properly",
                      "Creating custom RAII wrappers for file streams (optional)",
                      "Preventing resource leaks"
                    ]
                  },
                  {
                    "topicTitle": "Exception Safety",
                    "subtopics": [
                      "Strong Exception Safety Guarantee (Operations either succeed completely or have no effect)",
                      "Basic Exception Safety Guarantee (No resources are leaked, and the object is in a usable state)",
                      "No-Throw Guarantee (Operations never throw exceptions)",
                      "Writing Exception-Safe File I/O Code"
                    ]
                  },
                  {
                    "topicTitle": "Example: Reading a File with Robust Error Handling",
                    "subtopics": [
                      "Opening a file in a \`try\` block",
                      "Reading data from the file",
                      "Handling potential exceptions (e.g., \`ios_base::failure\`) in a \`catch\` block",
                      "Ensuring that the file stream is closed in a \`finally\` block (or using RAII)",
                      "Providing informative error messages"
                    ]
                  }
                ]
              }
            ].

          Requirements:
          - Match the overall complexity level: medium (easy | medium | hard).
          - Tailor the style and content for the intended use case: coding (coding | job | exam | general).
          - Always create exactly 4 options for each question.
          - Include questions that involve code snippets or code-based logic where appropriate (especially for coding use cases).
          - Prioritize meaningful, non-repetitive, and high-quality questions.
          - If fewer than <number> MCQs are feasible, output only as many as meet the quality standards.

          Output Format (JSON Array):
          [
            {
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "correctAnswer": "string",
              "correctOption": "A" | "B" | "C" | "D",
              "explanation": "string"
            },
            ...
          ]

          Notes:
          - correctAnswer must exactly match one of the options.
          - correctOption must indicate the corresponding letter ("A", "B", "C", or "D") for the correct answer.
          - explanation should briefly justify why the selected answer is correct (1–2 sentences maximum).
          - For coding MCQs, format short code snippets inline (e.g., \`print('Hello')\`) or use fenced code blocks (\`\`\`python ... \`\`\`) if multiline code is needed.
          - Output only the valid JSON array — no extra commentary or text.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `[
            {
              "question": "Which of the following file modes, when used with \`ofstream\`, will delete the file's content if it exists?",
              "options": [
                "ios::app",
                "ios::in",
                "ios::trunc",
                "ios::binary"
              ],
              "correctAnswer": "ios::trunc",
              "correctOption": "C",
              "explanation": "\`ios::trunc\` truncates the file to zero length if it exists, effectively deleting its contents when opening with \`ofstream\`."
            },
            {
              "question": "What is the primary difference between text files and binary files in C++ file handling?",
              "options": [
                "Text files are more efficient for storing large amounts of data.",
                "Binary files store data as a sequence of characters, while text files store data in raw byte format.",
                "Text files store data as formatted characters, while binary files store data in raw byte format.",
                "Binary files can only be used for storing images and videos."
              ],
              "correctAnswer": "Text files store data as formatted characters, while binary files store data in raw byte format.",
              "correctOption": "C",
              "explanation": "Text files interpret data as characters based on encoding, while binary files store the raw byte representation of data, making them suitable for storing any type of data."
            },
            {
              "question": "Which method is used to move the reading file pointer to a specific location in a file?",
              "options": [
                "seekg()",
                "seekp()",
                "tellg()",
                "tellp()"
              ],
              "correctAnswer": "seekg()",
              "correctOption": "A",
              "explanation": "\`seekg()\` is used to position the 'get' pointer (input pointer) to a specific location within a file for reading."
            },
            {
              "question": "What is the purpose of the \`eof()\` function in C++ file handling?",
              "options": [
                "To check if the file is open.",
                "To check if the file stream is in a good state.",
                "To check for general errors during file operations.",
                "To check for the end-of-file condition."
              ],
              "correctAnswer": "To check for the end-of-file condition.",
              "correctOption": "D",
              "explanation": "\`eof()\` returns true if the end-of-file indicator has been set, meaning the end of the file has been reached during a read operation."
            },
            {
              "question": "What does RAII stand for in the context of C++ file handling and resource management?",
              "options": [
                "Resource Allocation Is Initialization",
                "Resource Acquisition Is Initialization",
                "Resource Allocation Is Integration",
                "Resource Acquisition Is Integration"
              ],
              "correctAnswer": "Resource Acquisition Is Initialization",
              "correctOption": "B",
              "explanation": "RAII (Resource Acquisition Is Initialization) is a programming idiom used in C++ to ensure resources are properly released when an object goes out of scope."
            },
            {
              "question": "Which of the following is the correct way to open a file named 'data.txt' in binary mode for writing using \`ofstream\`?",
              "options": [
                "ofstream file('data.txt');",
                "ofstream file('data.txt', ios::in);",
                "ofstream file('data.txt', ios::binary);",
                "ofstream file('data.txt', ios::out | ios::binary);"
              ],
              "correctAnswer": "ofstream file('data.txt', ios::out | ios::binary);",
              "correctOption": "D",
              "explanation": "This opens the file in output mode (\`ios::out\`) and binary mode (\`ios::binary\`) for writing raw bytes of data."
            },
            {
              "question": "Consider the following code snippet:\\n\`\`\`cpp\\n#include <iostream>\\n#include <fstream>\\n\\nint main() {\\n  std::ofstream myfile(\\"example.txt\\");\\n  if (myfile.is_open()) {\\n    myfile << \\"This is a line.\\\\n\\";\\n    myfile.close();\\n  }\\n  return 0;\\n}\\n\`\`\`\\nWhat will be the content of 'example.txt' after executing this code?",
              "options": [
                "The file will be empty.",
                "The file will contain 'This is a line.\\\\n'.",
                "The file will contain garbage data.",
                "The program will crash."
              ],
              "correctAnswer": "The file will contain 'This is a line.\\\\n'.",
              "correctOption": "B",
              "explanation": "The code opens the file, writes the string \\"This is a line.\\\\n\\" to it, and then closes the file, persisting the written content."
            },
            {
              "question": "Which function is used to read a line of text from a file stream in C++?",
              "options": [
                "get()",
                "read()",
                "getline()",
                "write()"
              ],
              "correctAnswer": "getline()",
              "correctOption": "C",
              "explanation": "\`getline()\` reads characters from an input stream and stores them into a string until a delimiter (by default, newline) is found."
            }
          ]`,
        },
      ],
    },
  ],
});
