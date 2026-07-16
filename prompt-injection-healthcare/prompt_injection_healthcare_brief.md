# The Instructions You Did Not Type

## Prompt Injection and Safe AI Use in Healthcare

**Author:** Ram Paragi, Director of Strategic Outcomes and Accreditation, LSU Health New Orleans School of Medicine  
**Published:** July 15, 2026  
**Evidence current through:** July 15, 2026

> **Central idea:** Content that an AI reads can sometimes behave like instructions to the AI, even when the user never typed those instructions.

## A healthcare scenario

A resident asks an approved AI assistant to summarize a scanned outside-hospital record. Alongside ordinary clinical text, the document contains concealed content directing the AI to disregard the task and emphasize unrelated information. The resident never sees or types that instruction, but the AI produces a distorted summary.

This fictional scenario illustrates **indirect prompt injection**. The consequences become more serious when the assistant can retrieve records, write into the EHR, send messages, schedule appointments, browse the web, upload files, or call other software.

## Prompt injection is not just a bad prompt

It is a **trust, permissions, and system-design problem**.

A large language model generates an answer from information in its context. That context may include system rules, the user’s request, retrieved policies, tool results, webpages, emails, documents, images, transcripts, or clinical records. These sources have different real-world authority, but they can arrive in the same computational context.

Prompt injection occurs when input changes the AI’s behavior in a way that conflicts with the intended task or trusted instructions. OWASP identifies prompt injection as a leading LLM application risk, and current security guidance cautions against expecting one reliable technical fix.[S01-S04]

### Direct and indirect injection

- **Direct injection:** A person enters a manipulating instruction directly into the conversation.
- **Indirect injection:** The instruction is embedded in a PDF, webpage, email, image, portal message, retrieved source, tool response, or other content the AI is asked to process.
- **Multimodal injection:** The instruction arrives through an image, scan, audio transcript, or other modality.
- **Persistent exposure:** Hostile content remains in a document repository, email archive, vector database, knowledge base, application record, or AI memory and influences later tasks when retrieved again.

A jailbreak usually aims to bypass provider safety restrictions. It can use injection methods, but it is not identical to prompt injection. Prompt injection can instead target the user’s task, private information, tool use, or downstream actions.

## How indirect injection becomes harm

The basic pathway is:

**Untrusted content → AI context → altered response or tool call → possible consequence**

The most important limitation is also the key to understanding the risk:

> **Prompt injection does not give an AI magical access to every database. The system can generally reach only the information, applications, credentials, tools, and actions made available by its design and permissions. Those permissions form the ceiling of possible harm.**

A malicious instruction can nevertheless cause serious consequences when an AI has broad retrieval access, connected tools, an authenticated user or service identity, or authority to act.

## What prompt injection can actually do

### Manipulate answers and clinical decisions

The AI may omit, distort, reprioritize, or fabricate information while appearing to complete the user’s task. In healthcare, this could affect summaries, triage, evidence synthesis, medication advice, documentation, or clinical warnings. Controlled healthcare studies have demonstrated plausible prompt-injection harm under experimental conditions, including medical-advice and vision-language workflows. These studies do not establish real-world prevalence.[S11-S14]

### Expose PHI or institutional intellectual property

A manipulated AI may search reachable repositories for patient information, credentials, unpublished research, proprietary methods, contracts, strategic plans, source code, evaluations, or operational knowledge. It may reveal the information in its response or place it into an external communication, upload, link, search query, or tool call.

For this to occur, the AI must already have access to the information and an output or external channel through which it can disclose it. A standalone chatbot with no institutional connections has a smaller potential blast radius than an agent connected to email, cloud drives, the EHR, research repositories, or internal systems.

### Send unauthorized communications

If connected to email, messaging, browsers, cloud drives, or upload tools, the AI may send information to the wrong recipient, share a file, upload content, or communicate outside the intended workflow.

### Alter records or workflows

With write access, a manipulated assistant may insert misleading text, modify fields, change workflow status, alter schedules, delete information, or create an inaccurate record. Human review is valuable only when the reviewer can see the exact information, proposed change, and destination.

### Misuse authenticated authority

An agent may act through the user’s account, API token, connector, or non-human service identity. The AI is not creating new authority. It is misusing authority already delegated to it.

### Create persistent or repeated manipulation

A hostile instruction stored in a retrieved corpus, email archive, policy file, application record, or memory may affect future users and tasks. This is better understood as persistent hostile content than as conventional malware automatically infecting every file.

### Cause operational or financial disruption

Automated agents can trigger repeated searches, tool-call loops, unnecessary API use, workflow delays, or avoidable token and cloud costs when effective limits are absent.

### Contribute to technical system compromise

In dangerously designed systems, attacker-influenced content may be passed into shell, code-execution, or administrative tools. This is not an inherent capability of ordinary chatbots. It requires powerful tools, unsafe integration, and inadequate validation or isolation.[S18-S21]

## Why healthcare is especially exposed

Healthcare organizations process large volumes of outside and semi-trusted content: portal messages, imported clinical notes, outside records, faxes, scans, literature, images, research files, student work, residency applications, policies, and vendor data.

At the same time, healthcare AI may be connected to highly sensitive information and consequential workflows. The same technology can touch PHI, clinical documentation, medication recommendations, scheduling, research, education, finance, contracts, and institutional strategy.

The consequence of an event therefore depends on:

1. what information the AI can access;
2. which tools and credentials it can use;
3. whether it can communicate or act outside the conversation;
4. how much autonomy it has;
5. whether a person independently reviews consequential output;
6. whether actions are logged, monitored, reversible, and recoverable.

## Can prompt injection get inside the data?

A malicious instruction can be embedded in a document, record, webpage, image, knowledge base, vector database, email archive, or memory. When the AI later retrieves that material, the instruction may manipulate the AI.

That does not mean the document automatically infects every file or reveals every system. Further propagation or alteration requires additional capabilities, such as write access, broad retrieval permissions, communication tools, or conventional software vulnerabilities.

## Prompt injection is not the only way information leaves organizational control

Sensitive information can leave organizational control through several distinct pathways:

1. a user voluntarily pastes protected information into an unapproved system;
2. an AI retrieves more information than the task requires;
3. prompt injection manipulates the AI into retrieving or exposing information;
4. a connected agent sends, uploads, modifies, or discloses information;
5. information is retained in chat history, logs, caches, memory, telemetry, feedback, or safety-monitoring systems;
6. information is used for model improvement where applicable terms or settings permit;
7. institutional workflows and operational knowledge become dependent on a proprietary environment.

These risks can interact, but they are not interchangeable. Consumer, business, enterprise, education, healthcare, and API products may have different rules for retention, training, feedback, connectors, administrative control, deletion, and BAAs.[S30-S42, S49-S52]

**Not used for training** does not necessarily mean **nothing is retained**. **Zero data retention** must be interpreted according to its contractual and technical scope. A BAA does not automatically approve every product, feature, or workflow.

## PAUSE before using AI

PAUSE is an educational framework created for this resource. It is not a validated clinical or regulatory standard.

- **P: Permissions**  
  What records, applications, credentials, folders, tools, or actions can the AI access?
- **A: Approved tool and account**  
  Is this exact product, account type, feature, and workflow approved by the institution and clinical site?
- **U: Untrusted content**  
  Is the AI reading material that a patient, outside party, website, email sender, document author, or external system could have manipulated?
- **S: Sensitive or strategic information**  
  Does the task involve PHI, student records, credentials, confidential research, institutional plans, proprietary workflows, contracts, or financial information?
- **E: External action and exposure**  
  Can the AI send, upload, retain, disclose, modify, publish, order, schedule, or communicate information outside the immediate task?

Risk rises when several PAUSE conditions occur together.

## What users should do

1. Use only institutionally approved tools for institutional or clinical information.
2. Confirm the exact product, account, feature, permitted data, PHI conditions, and clinical site.
3. Do not assume a paid or business account is approved for PHI.
4. Grant the smallest necessary permissions.
5. Avoid broad instructions such as “review everything and do whatever is needed.”
6. Verify the information and destination before any upload, message, record change, order, or external action.
7. Independently verify clinical content before patient-care use.
8. Review AI-generated text before it enters the medical record.
9. Stop when the AI unexpectedly changes the task, requests credentials, asks for broader access, proposes an unexpected destination, or retrieves unrelated confidential material.
10. Do not continue testing suspected malicious content in a production clinical environment.

## What organizations must do

User awareness cannot replace system controls. Healthcare organizations need:

- approved-use policy and an AI inventory;
- risk classification and accountable owners;
- least-privilege identity and access management;
- scoped connectors and action-level authorization;
- separation of duties and human approval for consequential actions;
- secure retrieval-corpus governance;
- input controls and output validation;
- vendor, subprocessor, BAA, retention, and contract review;
- audit logs and anomaly monitoring;
- red-team testing and local workflow validation;
- incident response and continuity planning;
- model, feature, and vendor update management;
- recurring education and reassessment.

No classifier, filter, defensive sentence, hidden system prompt, awareness session, or red-team exercise eliminates prompt injection. The practical objective is to make manipulation harder, easier to detect, less consequential, auditable, and recoverable.[S01-S10, S15-S20]

## What healthcare leaders should ask

- Is this a consumer product, institutionally managed product, or contracted enterprise service?
- Who owns prompts, outputs, workflow configurations, evaluation datasets, and institutional knowledge?
- What is retained, for how long, and under which configuration?
- What changes when a user submits feedback?
- What does zero data retention cover, and what operational or security records remain?
- Which subprocessors can access data?
- Can the institution audit what information the AI accessed and what actions it took?
- Can prompts, workflows, evaluation assets, and institutional knowledge be exported?
- Can the workflow switch models without being rebuilt?
- Is a BAA available and applicable to this exact product and workflow?
- Who reviews changes in models, features, pricing, product terms, and data handling?

## Local policy matters

Ask both the institution and the clinical site which tools, accounts, features, and data types are approved. Ask whether any approved product may receive PHI, whether it may connect to email, drives, calendars, browsers, or the EHR, and how suspicious behavior should be reported.

LSU School of Medicine has a public policy for medical students that restricts PHI and confidential institutional information and emphasizes vetted services and partner-site policies.[S25] Ochsner Health publicly describes AI governance.[S26] This evidence review did not locate a current comprehensive public approved-product list for LSU Health New Orleans, LCMC Health, Ochsner Health, or Our Lady of the Lake Health. That does not establish that internal guidance is absent.

## What to do when behavior looks suspicious

1. Stop the AI task and do not authorize further actions.
2. Disconnect or revoke unnecessary tool access when permitted and safe.
3. Preserve prompts, outputs, timestamps, destinations, and affected records according to policy.
4. Record what the system accessed, attempted, produced, or transmitted.
5. Report through the approved local IT, privacy, security, compliance, clinical-informatics, or patient-safety process.
6. Treat affected clinical output as unverified and reassess downstream use.
7. Follow organizational incident-response, documentation-correction, privacy, and notification procedures.

## Key takeaways

1. Content can act like instructions even when the user did not type them.
2. The greatest consequences arise when untrusted content meets sensitive data, broad permissions, and an external action channel.
3. Prompt injection can distort outputs, expose PHI or institutional IP, alter records, misuse authenticated authority, and trigger unintended actions when the system has those capabilities.
4. Prompt injection, user disclosure, vendor retention, model improvement, excessive agency, and institutional dependency are different risks.
5. Use PAUSE to examine permissions, approval, untrusted content, sensitivity, and external exposure.
6. Users reduce exposure, but organizations own system design, identity, contracts, monitoring, incident response, and patient-safety controls.

## Independent-resource disclaimer

This independent educational resource summarizes current evidence and security guidance. It does not represent institutional policy or endorsement by LSU Health New Orleans, LCMC Health, Ochsner Health, or Our Lady of the Lake Health. Follow the current privacy, cybersecurity, acceptable-use, clinical-documentation, and AI requirements of the institution and clinical site where you work.

[Full references](prompt_injection_references.md)
