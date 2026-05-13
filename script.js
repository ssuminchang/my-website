/*
  script.js
  -----------------------------
  This file controls the interactive behavior of the portfolio.

  Main ideas:
  - P1, P2, and P3 are data objects for the three projects.
  - renderModal(project) turns project data into HTML and inserts it into #modal-box.
  - openModal(index) and closeModal() control the project popup.
  - IntersectionObserver adds .visible to elements when they enter the viewport.

  Editing rule of thumb:
  - To change project detail content, edit P1 / P2 / P3.
  - To change card text on the main page, edit index.html.
  - To change how things look, edit style.css.
*/
// Custom cursor element used on desktop.
var cur = document.getElementById('cursor');
// Project 001 data. The modal content is generated from this object.
var P1 = {
    num: "Project 001", name: "AI 研究寫作全攻略",
    subtitle: "NotebookLM x Gemini x ChatGPT x Perplexity",
    tagGroups: [
        { label: "Research & Strategy", items: ["UX Research", "Product Strategy"], hi: true },
        { label: "Experience & Execution", items: ["AI Workflow Design", "Information Architecture", "Learning Experience Design", "Cross-functional Collaboration"], hi: false }
    ],
    tldr: [
        { key: "問題", val: "AI 工具快速普及，但在「研究寫作」情境中缺乏穩定的應用方法" },
        { key: "方法", val: "探索型研究：情境觀察 + 使用者訪談 + 市場調查" },
        { key: "關鍵洞察", val: "使用者不缺 AI 工具，而是缺「可重複執行的研究流程」", accent: true },
        { key: "成果", val: "產品上市 20 天即達成年度毛利目標 100%", accent: true }
    ],
    product: {
        img: "https://raw.githubusercontent.com/ssuminchang/my-website/main/F6634.png",
        title: "AI 研究寫作全攻略",
        subtitle: "NotebookLM × Gemini × ChatGPT × Perplexity",
        desc: "本書完整示範 AI 輔助研究與論文寫作的實戰流程，陪你度過那些「卡住、寫不下去」的關鍵節點，並以更高效、更精準的方式完成論文。",
        links: [{ label: "View Product", url: "https://www.books.com.tw/products/0011044193" }]
    },
    flowSteps: [
        { tag: "Research", body: "情境觀察 + 使用者訪談 + 市場調查" },
        { tag: "Key Insight", body: "使用者缺乏「可運用 AI、重複執行的研究 workflow」" },
        { tag: "Workflow Strategy", body: "AI Research Workflow + Responsible AI 設計" },
        { tag: "Outcome", body: "20 天達成年度目標、開拓新受眾" }
    ],
    sections: [
        { label: "Context & Challenge", title: "市場缺口與內部挑戰",
            body: "隨著生成式 AI 工具快速普及，使用者已能取得強大的內容生成能力，但在「研究寫作」這類高知識密集的任務中，仍難以轉化為可支持研究流程的實際方法，造成成效不佳。",
            chips: ["#以工具及功能導向為主", "#缺乏跨工具整合的應用情境", "#缺少結構化研究流程", "#公司未曾經營的新受眾"] },
        { label: "Research Goals", title: "研究目標",
            bullets: ["了解使用者如何在研究情境中使用 AI 工具", "找出研究流程中的關鍵阻礙與斷點", "評估是否存在可被產品化的 AI 輔助研究流程"] },
        { label: "Research Approach", title: "探索型研究策略",
            body: "在資源有限且問題高度不確定的情況下，採用輕量但多來源的探索型研究策略。",
            bullets: ["情境觀察：參與 AI 相關講座，觀察現場 Q&A；長期接觸研究所學生（超過 10 年），累積觀察超過 60 位研究生的實際研究行為", "使用者訪談：訪談日間部、在職研究生的 AI 工具使用行為，共計 10 位", "市場調查：台灣尚無 AI 輔助研究相關出版品；專案提案時中國市場僅約 2 本相關書籍"] },
        { label: "User Problem Space", title: "三大核心痛點",
            bulletTags: [
                { text: "研究啟動困難：使用者缺乏「問題定義能力」，而 AI 無法直接解決此問題。", tags: ["#對研究命題感到迷茫", "#不理解研究假設與變項設計", "#無法將興趣範圍轉化為研究問題"] },
                { text: "知識理解與轉化困難：能取得資訊，但缺乏「理解→轉化→應用」的串接機制。", tags: ["#難以閱讀與理解學術論文", "#無法將論文內容轉化為自身研究", "#不知道如何選擇研究方法與統計方法"] },
                { text: "研究流程與工具整合缺失：缺乏「可執行的 AI 研究工作流」與使用規範。", tags: ["#不清楚哪些 AI 工具適合什麼階段", "#缺乏串接 AI 工具的方法", "#缺乏完整研究流程的指引", "#不了解使用 AI 所延伸的學術倫理問題"] }
            ] },
        { label: "Key Insight", title: "關鍵洞察",
            bulletTags: [
                { text: "機會：使用者缺乏「AI 工具輔助下，可重複執行的研究流程」", tags: [] },
                { text: "風險：引發學術倫理問題，像是 AI 虛構文獻，導致學位被撤銷", tags: [] }
            ] },
        { label: "Strategy Translation", title: "策略轉化",
            positioning: "「AI 輔助研究流程」——以 workflow 為核心的產品設計", divider: true },
        { label: "Design Principles", title: "設計原則",
            principles: [
                { name: "1. Workflow over Tools", sub: "流程優先於工具", tags: ["#將研究過程拆解為可執行的步驟", "#在各階段引入適合的 AI 工具", "#降低使用者自行組合工具的負擔"] },
                { name: "2. Structured Guidance", sub: "結構化決策引導", tags: ["#引導使用者定義研究問題與假設", "#提供研究方法與統計分析的選擇邏輯", "#將 AI 輸出轉化為可用於研究決策的資訊"] },
                { name: "3. Repeatability & Learnability", sub: "可重複性與可學習性", tags: ["#建立標準化 workflow 與操作模板", "#讓使用者能在不同研究主題中重複應用", "#降低對個人經驗與 trial-and-error 的依賴"] },
                { name: "4. Responsible AI Integration", sub: "負責任的 AI 使用整合", tags: ["#在流程中加入「結果檢查」步驟", "#引導使用者理解 AI 可能產生的錯誤", "#提供學術圈對於 AI 輔助與使用者責任的界定現況"] }
            ],
            principleFooter: "上述原則共同支撐一個核心目標：將 AI 從「內容生成工具」，轉化為「支援研究決策與流程推進的系統」" },
        { label: "Strategy Execution", title: "策略落地",
            body: "基於上述設計原則，我將研究洞察轉化為可執行的產品結構與 AI workflow：",
            execution: [
                { name: "1. 建立 AI 輔助研究 Workflow", body: "將研究流程拆解為多個可執行階段，並於不同階段整合適合的 AI 工具與使用方式。", tags: ["#研究問題定義", "#文獻閱讀與理解", "#研究架構建立", "#方法論概念釐清", "#統計方法選擇", "#論文撰寫與修正"] },
                { name: "2. 整合多工具應用情境", body: "設計跨工具 workflow，而非單一工具教學，降低使用者自行摸索工具組合的成本。", tags: ["#ChatGPT & Gemini：研究問題探索、內容生成、統計分析", "#NotebookLM：文獻整理與摘要、內容驗證", "#Perplexity：蒐集文獻資料"] },
                { name: "3. 建立可重複使用的操作模板", body: "將 AI 使用方式轉化為結構化方法，協助使用者建立可持續使用的方法，而非一次性技巧。", tags: ["#Prompt 模板", "#Workflow 與人工檢查架構", "#研究流程 SOP"] },
                { name: "4. 導入 Responsible AI 使用機制", body: "為降低 AI 使用風險，在 workflow 中加入驗證與提醒機制，避免使用者直接依賴 AI 生成結果。", tags: ["#文獻來源驗證", "#AI 輸出檢查流程", "#學術倫理與引用提醒"] },
                { name: "5. 建立領域合作與產品可信度", body: "透過參與 AI 與研究相關講座，觀察領域專家觀點，進一步篩選並建立潛在合作作者名單，確保產品內容具備研究領域專業性。", tags: ["#具備研究領域專業性", "#兼顧 AI 應用與學術可信度", "#符合目標受眾的實際需求與語言脈絡"] }
            ] }
    ],
    outcome: { custom: true, groups: [
            { label: "使用者層面", items: ["降低使用者進入 AI 輔助研究的門檻", "協助使用者建立研究流程理解", "提升 AI 工具在研究情境中的可操作性"] },
            { label: "產品層面", items: ["成功將抽象 AI 能力轉化為具體產品場景", "建立公司首個 AI 輔助研究類型產品", "驗證 workflow 型內容的市場需求"] },
            { label: "商業成果", items: ["上市 20 天即達成年毛利目標 100%", "上市初期進入各大通路 Top 3", "專案績效超過部門平均值 300%"], highlight: true },
            { label: "組織影響", items: ["開拓公司未曾經營的新受眾", "建立後續「AI 支援決策」相關產品的參考框架", "促進公司以相同架構，展開理財類型專案"] }
        ] }
};
// Project 002 data. Keep the same structure as P1 so renderModal can reuse the same template.
var P2 = {
    num: "Project 002", name: "從頭打造 LLM 模型",
    subtitle: "原書：Build a Large Language Model (From Scratch) by Sebastian Raschka",
    tagGroups: [
        { label: "Research & Strategy", items: ["UX Research", "Product Strategy", "Learning Accessibility"], hi: true },
        { label: "Experience & Execution", items: ["Learning Experience Design", "Information Architecture", "Technical Content Design", "Cross-functional Collaboration"], hi: false }
    ],
    tldr: [
        { key: "問題", val: "LLM 技術學習門檻高，許多初學者還沒真正開始理解模型概念，就先卡在環境建置與執行流程。" },
        { key: "方法", val: "從初學者的學習體驗出發，重新調整實作流程、內容編排與程式執行方式，降低學習與實作門檻。" },
        { key: "關鍵洞察", val: "初學者在真正理解模型概念之前，就已經因環境建置與 terminal 操作而中斷學習。", accent: true },
        { key: "成果", val: "產品上市 2 個月即達成年度毛利目標 100%。", accent: true }
    ],
    product: {
        img: "https://raw.githubusercontent.com/ssuminchang/my-website/main/F5375.png",
        title: "從頭打造 LLM (大型語言模型) 實戰秘笈",
        subtitle: "讓 AI 好好說話！",
        desc: "本書涵蓋了建構 LLM 的完整過程，包括處理資料集、實作模型架構、注意力機制、使用無標籤的資料進行預訓練，以及針對特定任務的微調技術（分類任務微調與指令微調）。",
        links: [{ label: "View Product", url: "https://www.books.com.tw/products/0011011923" }]
    },
    flowSteps: [
        { tag: "Research", body: "情境觀察 + 程式測試 + 內容分析" },
        { tag: "Key Insight", body: "許多對 LLM 有興趣的學習者，在真正開始之前，就先卡在環境建置與技術門檻" },
        { tag: "Learning Experience Design", body: "Colab 實作版本 + 結構化學習引導" },
        { tag: "Outcome", body: "2 個月達成年度目標、提升初學者實作可能性" }
    ],
    sections: [
        { label: "Context & Challenge", title: "LLM 技術的學習門檻高",
            body: "隨著大型語言模型（LLM）受到廣泛關注，越來越多人開始接觸 AI 與模型開發。然而，對初學者來說，光是環境建置，一直到能夠實際執行，都存在不小門檻。本書內容完整且深入，但對非工程背景的讀者而言，實作過程容易在一開始就中斷。",
            chips: ["#本地端環境建置流程複雜", "#terminal 操作門檻高", "#專有名詞與程式邏輯不易理解", "#部分流程對初學者來說跳太快", "#學習容易在 setup 階段中斷"] },
        { label: "Research Goals", title: "研究目標",
            bullets: ["了解初學者在學習與實作 LLM 過程中的主要阻礙", "重新思考技術內容的學習體驗，降低初學者在環境建置、理解流程與實作上的負擔", "提升讀者從「開始閱讀」到「完成實作」的可能性"] },
        { label: "Research Approach", title: "參與式觀察法",
            body: "以「初學者如何開始學習 LLM」為核心，結合自身學習經驗、程式測試與內容分析，重新檢視整體學習流程。",
            bullets: ["情境觀察：自身作為程式初學者，在建置開發環境與執行流程時，觀察到許多容易學習體驗的中斷點", "技術驗證：實際測試與 debug 書中所有程式碼流程，確認初學者可能遇到的錯誤情境與執行問題", "內容分析：重新檢視原始教材的章節節奏、步驟跨度與專有名詞密度，找出可能造成認知負荷過高的地方"] },
        { label: "User Problem Space", title: "三大核心痛點",
            bulletTags: [
                { text: "環境建置門檻：很多初學者還沒開始理解模型概念，就已經卡在環境建置與執行流程。", tags: ["#本地端環境建置複雜", "#terminal 操作陌生", "#dependency 與執行流程容易中斷學習"] },
                { text: "技術理解斷點：即使成功執行程式，也不代表能真正理解內容。", tags: ["#專有名詞難以理解", "#程式碼缺乏脈絡說明", "#初學者難以理解程式邏輯與用途"] },
                { text: "認知負荷過高：部分章節對初學者來說步驟跨度過大，還沒理解前面的概念，就已經進到下一段實作。", tags: ["#章節節奏偏快", "#缺乏中間拆解步驟", "#流程理解與實作容易脫節"] }
            ] },
        { label: "Key Insight", title: "關鍵洞察",
            body: "觀察到許多對 LLM 有興趣的初學者，在正式開始之前，就被環境建置與技術門檻擋在門外。若能降低其門檻，原本不具工程背景的讀者，也有機會進入 LLM 學習與實作。" },
        { label: "Strategy Translation", title: "策略轉化",
            positioning: "以降低 onboarding friction 與 cognitive load 為核心的學習體驗設計", divider: true },
        { label: "Design Principles", title: "設計原則",
            principles: [
                { name: "1. Lower the Barrier to Start", sub: "降低入門門檻", tags: ["#降低環境建置門檻", "#減少因 setup 中斷學習的情況", "#讓初學者能更快開始實作"] },
                { name: "2. Learn Through Structured Guidance", sub: "透過結構化引導學習", tags: ["#拆解複雜流程與步驟", "#補充專有名詞與程式碼脈絡", "#降低理解與實作之間的落差"] },
                { name: "3. Accessibility with Practical Awareness", sub: "兼顧易用性與實務限制", tags: ["#提供 Colab 可執行版本", "#補充本地端執行與安全性說明", "#平衡學習便利性與實際使用情境"] }
            ],
            principleFooter: "上述原則共同支撐一個核心目標：讓原本偏工程導向的 LLM 學習內容，能被更多初學者理解、開始實作，並持續完成學習。" },
        { label: "Strategy Execution", title: "策略落地",
            execution: [
                { name: "Colab 實作版本設計", body: "將原本需要透過 terminal 與本地端環境執行的部分流程，重新調整為可在 Google Colab 上運行。重新調整部分程式碼與執行方式，讓讀者能直接在 Colab 上完成實作。同時也補充說明：若有資料安全性或本地模型需求，仍建議於本地端執行。", tags: ["#重構執行流程為 Colab 版本", "#補充本地端安全性說明"] },
                { name: "技術內容重構", body: "針對初學者較容易卡住的內容，降低讀者在理解與實作之間的落差。", tags: ["#補充專有名詞說明", "#增加程式碼註解", "#拆分部分流程步驟", "#調整章節節奏與分段"] }
            ] }
    ],
    outcome: { custom: true, groups: [
            { label: "使用者層面", items: ["降低初學者開始實作 LLM 的門檻", "讓讀者能更快進入模型實作流程", "提升技術內容的可理解性與可操作性"] },
            { label: "商業成果", items: ["上市 2 個月即達成年度毛利目標 100%", "上市初期進入各大通路 Top 3", "專案績效超過部門平均值 250%"], highlight: true }
        ] }
};
// Project 003 data. Keep the same structure as P1/P2.
var P3 = {
    num: "Project 003", name: "人機協作編修 workflow",
    subtitle: "Python scripts + LLM subagents + Human checkpoints",
    tagGroups: [
        { label: "Research & Strategy", items: ["Workflow Research", "Operational Strategy", "Human-AI Collaboration"], hi: true },
        { label: "Experience & Systems", items: ["AI Workflow Design", "Editorial Process Design", "Cross-functional Collaboration"], hi: false }
    ],
    tldr: [
        { key: "問題", val: "技術翻譯高度依賴人工校對與編輯經驗，流程耗時，且 AI 翻譯容易出現漏譯、誤譯與 AI 腔等問題。" },
        { key: "方法", val: "重新設計 AI 與編輯協作流程，建立可重跑、可檢查、可逐步決策的六階段 workflow。" },
        { key: "關鍵洞察", val: "缺乏一套能兼顧品質、一致性與規模化，同時降低成本的人機協作流程。", accent: true },
        { key: "成果", val: "建立可跨書系複用的 AI-assisted editorial workflow，並透過多章節測試驗證流程可行性。", accent: true }
    ],
    flowSteps: [
        { tag: "Research", body: "編輯流程觀察 + 翻譯問題分析 + AI 行為測試" },
        { tag: "Key Insight", body: "問題不只是翻譯速度，而是缺乏兼顧品質與規模化的工作流" },
        { tag: "Workflow System Design", body: "Python scripts + LLM subagents + Human checkpoints" },
        { tag: "Outcome", body: "建立可規模化的人機協作流程 + 多階段審查機制" }
    ],
    sections: [
        { label: "Context & Challenge", title: "技術翻譯流程的效率與品質衝突",
            body: "技術翻譯書籍的製作流程，除了翻譯本身，還包含大量人工校對、原文比對、術語確認與程式測試。傳統流程大多會搭配專業譯者初步翻譯，並高度依賴編輯個人經驗與英文能力，不同編輯對 AI 的使用方式與工作習慣也不一致，導致專案品質與執行時間差異很大。雖然 LLM 能提升翻譯效率、減少譯者相關成本，但因容易產生 AI 幻覺，導致成果品質控管不易。",
            chips: ["#漏譯與誤譯", "#AI 過度延伸原文語意", "#翻譯腔與 AI 腔", "#專有名詞不一致", "#章節結構混亂", "#缺乏可檢查與可回溯的流程"] },
        { label: "Research Goals", title: "研究目標",
            bullets: ["了解技術翻譯流程中最耗時且最容易出錯的環節", "重新設計 AI 與編輯之間的協作方式，降低重複性校對成本", "建立一套能兼顧品質、一致性與規模化，同時降低成本的人機協作 workflow"] },
        { label: "Research Approach", title: "質性研究與系統工程思維的混合研究策略",
            body: "從實際技術翻譯流程出發，結合工作流觀察、AI 行為測試與編輯經驗分析，重新拆解整體編修流程。",
            bullets: ["參與觀察法：觀察技術書編輯在翻譯、校稿、術語確認與程式測試上的實際工作流程與時間消耗", "AI 行為測試：測試 LLM 在技術翻譯情境中的輸出穩定性，分析漏譯、誤譯、AI 腔與語意偏移等問題", "專家意見調查：調查不同編輯在英文能力、AI 使用習慣與校稿方式上的差異，分析哪些流程可以被規格化", "系統分析與流程重組：將原本高度依賴人工經驗的流程拆解為可被 Python、LLM 與人工協作的工作階段"] },
        { label: "User Problem Space", title: "三大核心問題",
            bulletTags: [
                { text: "高度依賴人工經驗：大量時間花費在重複比對與人工校稿。", tags: ["#逐段比對原文與譯文", "#人工確認專有名詞", "#程式碼測試與 debug", "#不同編輯流程差異大"] },
                { text: "AI 翻譯不穩定：AI 能提升效率，但缺乏穩定品質。", tags: ["#漏譯與誤譯", "#AI 過度延伸原文語意", "#翻譯腔與 AI 腔", "#缺乏可驗證機制"] },
                { text: "缺乏標準化、可規模化的流程：整體編譯流程高度依賴個人能力，難以擴展成標準化的系統流程。", tags: ["#沒有固定 workflow", "#缺乏檢查點與回溯機制", "#專有名詞不一致", "#難以跨書系複製流程"] }
            ] },
        { label: "Key Insight", title: "關鍵洞察",
            bullets: ["觀察到影響技術書籍的翻譯效率、成本控管的關鍵，是缺乏一套能兼顧品質、一致性與規模化，同時降低成本的人機協作 workflow", "相較於完全自動化，AI 更適合負責大量比對、檢查與建議，而最終判斷仍需由編輯負責"] },
        { label: "Strategy Translation", title: "策略轉化",
            positioning: "重新設計「AI 與編輯如何協作」的工作流程，將原本高度依賴人工經驗的編修流程，拆解為可被 Python、LLM 與編輯共同完成的 workflow system。", divider: true },
        { label: "Design Principles", title: "設計原則",
            principles: [
                { name: "Human-in-the-loop Workflow", sub: "人機協作工作流", tags: ["#AI 負責大量比對與建議", "#保留編輯最終決策權", "#每個階段設置檢查點", "#避免 AI 直接改稿"] },
                { name: "Scalable Editorial System", sub: "可規模化的編修系統", tags: ["#建立可重跑 workflow", "#建立共用 style guide 與 glossary", "#降低個人工作習慣差異", "#提升跨書系複用性"] },
                { name: "Verifiable AI Assistance", sub: "可驗證的 AI 輔助機制", tags: ["#所有建議皆保留原文與譯文對照", "#可 diff、可還原、可追蹤", "#降低 AI hallucination 風險", "#提升編輯判斷效率"] }
            ],
            principleFooter: "上述原則共同支撐一個核心目標：AI 協助處理大量比對、潤飾等重複性工作，並且提供各個階段的檢查點，將最終判斷與品質把關保留給編輯處理。" },
        { label: "Human-AI Collaboration Model", title: "分工架構",
            collaboration: [
                { name: "Python", icon: "{ }", items: ["確定性工作", "術語替換、結構標註", "套用使用者決策"] },
                { name: "LLM", icon: "#", sub: "Head Agent & Sub Agent", items: ["大量文本分析與建議", "忠實度對照、風格潤飾、結構建議", "只提供建議，不直接改稿"] },
                { name: "Editor", icon: "O", items: ["判斷與最終決策", "每階段檢查點", "採用 / 修改 / 拒絕 AI 建議"] }
            ],
            collaborationNotes: [
                "Python 處理可規則化、可重複執行的機械性工作，避免將確定性任務交給 LLM，節省 token 消耗並提升流程穩定性。",
                "Head Agent 不直接讀取全文，而是透過 Subagent 分工與檔案寫入機制，降低 context 消耗並避免主對話污染。",
                "編輯只審查前後對照表，並進行決策，保留判斷權與把關品質。"
            ] },
        { label: "Shared Infrastructure", title: "共用基礎設施",
            body: "建立可被不同編輯與不同書系重複使用的 workflow infrastructure。",
            infraGroups: [
                { name: "Python Scripts", tags: ["#結構標註", "#術語替換", "#忠實度決策套用", "#AI 腔掃描", "#章節結構分析", "#結構調整"] },
                { name: "Shared Artifacts", tags: ["#style guide", "#term glossary", "#decision rules", "#code comment criteria", "#style extraction checklist"] }
            ] },
        { label: "Strategy Execution", title: "建立六階段編修 Workflow",
            body: "設計從原文 PDF 與譯文 docx，到最終可排版稿件的六階段 workflow：",
            phases: [
                { id: "0", name: "結構標註", tool: "Python + Editor", desc: "使用 Python 自動辨識標題層級與程式碼區塊。" },
                { id: "1", name: "忠實度校稿", tool: "LLM Subagent + Editor + Python", desc: "透過 subagent 對照原文與譯文，產出問題類型、修改建議、前後差異對照表。編輯確認修改內容後，由 Python 套用決策。" },
                { id: "2", name: "程式碼註解", tool: "LLM Subagent + Editor + Python", desc: "針對初學者較難理解的程式碼區塊補充中文註解。編輯確認補充內容後，由 Python 套用決策。" },
                { id: "3", name: "風格萃取", tool: "LLM + Editor", desc: "從既有章節建立全書共用 style guide 與 glossary。編輯將視 AI 編修效果，適時調整風格萃取內容。" },
                { id: "4", name: "風格潤飾", tool: "LLM Subagent + Editor + Python", desc: "為降低翻譯腔與 AI 腔，由 subagent 進行潤飾，產出問題類型、修改建議、前後差異對照表。編輯確認修改內容後，由 Python 套用決策。" },
                { id: "5", name: "補結構", tool: "LLM + Editor", desc: "偵測需要新增小節與層級的段落，提升閱讀節奏與結構清晰度。" }
            ] }
    ],
    outcome: { custom: true, groups: [
            { label: "Workflow 層面", items: ["建立可重跑、可回溯的人機協作 workflow", "降低人工逐段比對成本", "建立跨章節可複用的編修流程", "透過多個章節測試，驗證 workflow 可行性"] },
            { label: "品質層面", items: ["提升專有名詞一致性", "降低漏譯與誤譯問題", "降低 AI 腔與翻譯腔", "建立可驗證、可追蹤的 AI 輔助機制"] },
            { label: "組織層面", items: ["建立可跨書系複用的編修規範與 artifact"], highlight: true,
                chips: ["#通用原則", "#專有名詞對照表", "#敘事句式、節奏與語氣規範", "#標點符號風格", "#章節結構與標題層級規範", "#程式碼標註慣例", "#翻譯腔修正規範", "#AI 腔修正規範"] }
        ] }
};
// Project order. openModal(0) opens P1, openModal(1) opens P2, etc.
var projects = [P1, P2, P3];
// Builds the Research → Insight → Outcome flow block inside each modal.
function buildFlowHtml(steps) {
    var h = '<div class="flow-block"><div class="flow-label">Research-Driven Product Strategy</div><div class="flow-steps">';
    for (var i = 0; i < steps.length; i++) {
        h += '<div class="flow-step"><span class="flow-step-tag">' + steps[i].tag + '</span><span class="flow-step-body">' + steps[i].body + '</span></div>';
        if (i < steps.length - 1)
            h += '<div class="flow-arrow">↓</div>';
    }
    return h + '</div></div>';
}
// Builds each case-study section based on the data format provided in P1/P2/P3.sections.
function renderSection(s) {
    var inner = s.body ? '<p class="m-body">' + s.body + '</p>' : '';
    if (s.bullets) {
        inner += '<ul class="m-bullet-list">';
        for (var i = 0; i < s.bullets.length; i++)
            inner += '<li>' + s.bullets[i] + '</li>';
        inner += '</ul>';
    }
    if (s.bulletTags) {
        inner += '<ul class="m-bullet-list">';
        for (var i = 0; i < s.bulletTags.length; i++) {
            var b = s.bulletTags[i];
            var chips = '';
            for (var j = 0; j < b.tags.length; j++)
                chips += '<span class="m-chip">' + b.tags[j] + '</span>';
            inner += '<li><div><div class="bullet-text">' + b.text + '</div>' + (chips ? '<div class="m-chips">' + chips + '</div>' : '') + '</div></li>';
        }
        inner += '</ul>';
    }
    if (s.chips) {
        inner += '<div class="m-chips">';
        for (var i = 0; i < s.chips.length; i++)
            inner += '<span class="m-chip">' + s.chips[i] + '</span>';
        inner += '</div>';
    }
    if (s.positioning) {
        inner += '<div style="font-family:var(--display);font-size:var(--text-2xl-plus);font-weight:900;line-height:1.4;margin-top:.5rem;letter-spacing:-.02em;">' + s.positioning + '</div>';
        if (s.divider)
            inner += '<div style="margin-top:1.5rem;display:flex;align-items:center;gap:1rem;"><div style="flex:1;height:2px;background:var(--text);"></div><div style="font-family:var(--display);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.2em;white-space:nowrap;color:var(--primary-soft);">Design & Execution →</div><div style="flex:1;height:2px;background:var(--text);"></div></div>';
    }
    if (s.principles) {
        inner += '<div style="display:grid;gap:.6rem;margin-top:.75rem;">';
        for (var i = 0; i < s.principles.length; i++) {
            var pr = s.principles[i];
            var ptags = '';
            for (var j = 0; j < pr.tags.length; j++)
                ptags += '<span class="m-chip">' + pr.tags[j] + '</span>';
            inner += '<div style="border:1px solid var(--divider);padding:.85rem 1rem;background:var(--surface-warm);"><div style="font-family:var(--display);font-size:var(--text-body);font-weight:900;text-transform:uppercase;">' + pr.name + '</div><div style="font-family:var(--display);font-size:var(--text-xs);opacity:.5;text-transform:uppercase;letter-spacing:.08em;margin:.2rem 0 .5rem;">' + pr.sub + '</div><div class="m-chips">' + ptags + '</div></div>';
        }
        inner += '</div>';
        if (s.principleFooter)
            inner += '<div style="margin-top:1rem;padding:1rem;background:var(--primary);color:var(--surface);font-size:var(--text-body-sm);line-height:1.7;">' + s.principleFooter + '</div>';
    }
    if (s.collaboration) {
        var colStyles = [
            { bg: 'var(--surface-warm)', color: 'var(--text)', border: 'var(--divider)', lc: 'var(--primary-soft)' },
            { bg: 'var(--primary)', color: 'var(--surface)', border: 'var(--primary)', lc: 'var(--highlight)' },
            { bg: 'var(--highlight)', color: 'var(--text)', border: 'var(--highlight-border)', lc: 'var(--highlight-text)' }
        ];
      inner += '<div class="collaboration-grid">';  
        for (var i = 0; i < s.collaboration.length; i++) {
            var c = s.collaboration[i];
            var st = colStyles[i];
            var citems = '';
            for (var j = 0; j < c.items.length; j++)
                citems += '<div style="font-size:var(--text-md-plus);line-height:1.7;padding:.25rem 0;border-bottom:1px solid var(--line-neutral);opacity:.85;">→ ' + c.items[j] + '</div>';
            inner += '<div style="border:1px solid ' + st.border + ';padding:1.25rem 1rem;background:' + st.bg + ';color:' + st.color + ';"><div style="font-family:var(--display);font-size:var(--text-project-title);font-weight:900;margin-bottom:.2rem;color:' + st.lc + ';">' + c.icon + '</div><div style="font-family:var(--display);font-size:var(--text-subtitle);font-weight:900;text-transform:uppercase;">' + c.name + '</div>' + (c.sub ? '<div style="font-family:var(--display);font-size:var(--text-3xs);text-transform:uppercase;letter-spacing:.08em;opacity:.6;margin-bottom:.75rem;">' + c.sub + '</div>' : '<div style="margin-bottom:.75rem;"></div>') + citems + '</div>';
        }
        inner += '</div>';
        if (s.collaborationNotes) {
            inner += '<div style="margin-top:.75rem;display:grid;gap:.4rem;">';
            for (var i = 0; i < s.collaborationNotes.length; i++) {
                inner += '<div style="font-size:var(--text-label);line-height:1.7;padding:.5rem .75rem;border-left:2px solid var(--divider);opacity:.7;">' + s.collaborationNotes[i] + '</div>';
            }
            inner += '</div>';
        }
    }
    if (s.infraGroups) {
        inner += <div class="outcome-grid outcome-grid-3">;
        for (var i = 0; i < s.infraGroups.length; i++) {
            var g = s.infraGroups[i];
            var gtags = '';
            for (var j = 0; j < g.tags.length; j++)
                gtags += '<span class="m-chip">' + g.tags[j] + '</span>';
            inner += '<div style="border:1px solid var(--divider);padding:1rem;"><div style="font-family:var(--display);font-size:var(--text-label);font-weight:900;text-transform:uppercase;margin-bottom:.75rem;color:var(--primary-soft);">' + g.name + '</div><div class="m-chips">' + gtags + '</div></div>';
        }
        inner += '</div>';
    }
    if (s.phases) {
        inner += '<div style="margin-top:.75rem;">';
        for (var i = 0; i < s.phases.length; i++) {
            var ph = s.phases[i];
            var isLast = i === s.phases.length - 1;
            inner += '<div style="display:flex;align-items:stretch;"><div style="display:flex;flex-direction:column;align-items:center;width:2.5rem;flex-shrink:0;"><div style="width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:var(--text-md);font-weight:900;background:var(--text);color:var(--surface);flex-shrink:0;">' + ph.id + '</div>' + (!isLast ? '<div style="width:2px;flex:1;background:var(--divider);margin:.2rem 0;"></div>' : '') + '</div><div style="flex:1;padding:.4rem 0 ' + (isLast ? '0' : '1.2rem') + ' 1rem;"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-bottom:.3rem;"><span style="font-family:var(--display);font-size:var(--text-subtitle);font-weight:900;">Phase ' + ph.id + '｜' + ph.name + '</span><span style="font-family:var(--display);font-size:var(--text-3xs);text-transform:uppercase;letter-spacing:.08em;padding:.15rem .45rem;border:1px solid var(--divider);color:var(--primary-soft);">' + ph.tool + '</span></div><div style="font-size:var(--text-label);line-height:1.7;opacity:.7;">' + ph.desc + '</div></div></div>';
        }
        inner += '</div>';
    }
    if (s.execution) {
        inner += '<div style="display:grid;gap:.6rem;margin-top:.75rem;">';
        for (var i = 0; i < s.execution.length; i++) {
            var ex = s.execution[i];
            var etags = '';
            for (var j = 0; j < ex.tags.length; j++)
                etags += '<span class="m-chip">' + ex.tags[j] + '</span>';
            inner += '<div style="border:1px solid var(--divider);padding:.85rem 1rem;"><div style="font-family:var(--display);font-size:var(--text-body);font-weight:900;text-transform:uppercase;margin-bottom:.35rem;">' + ex.name + '</div><div style="font-size:var(--text-label);line-height:1.7;opacity:.7;margin-bottom:.5rem;">' + ex.body + '</div><div class="m-chips">' + etags + '</div></div>';
        }
        inner += '</div>';
    }
    return '<div class="m-section"><div class="m-sec-label">' + s.label + '</div><div class="m-sec-title">' + s.title + '</div>' + inner + '</div>';
}
// Combines project data into the full modal HTML.
function renderModal(p) {
    var tldrHtml = '';
    for (var i = 0; i < p.tldr.length; i++) {
        var t = p.tldr[i];
        tldrHtml += '<div><div class="tldr-key">' + t.key + '</div><div class="tldr-val' + (t.accent ? ' accent' : '') + '">' + t.val + '</div></div>';
    }
    var tagsHtml = '';
    if (p.tagGroups) {
        tagsHtml = '<div style="margin-top:1.2rem;"><div style="font-family:var(--display);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.15em;color:var(--primary-soft);margin-bottom:.75rem;">My Role</div><div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:flex-start;">';
        for (var i = 0; i < p.tagGroups.length; i++) {
            var g = p.tagGroups[i];
            var items = '';
            for (var j = 0; j < g.items.length; j++)
                items += '<span class="m-tag' + (g.hi ? ' hi' : '') + '">' + g.items[j] + '</span>';
            tagsHtml += '<div style="display:flex;flex-direction:column;gap:.4rem;"><div style="font-family:var(--display);font-size:var(--text-3xs);text-transform:uppercase;letter-spacing:.12em;opacity:.45;">' + g.label + '</div><div style="display:flex;flex-wrap:wrap;gap:.4rem;">' + items + '</div></div>';
        }
        tagsHtml += '</div></div>';
    }
    var o = p.outcome;
    var outcomeHtml = '';
    if (o.custom) {
        var gHtml = '';
        for (var i = 0; i < o.groups.length; i++) {
            var g = o.groups[i];
            var hi = g.highlight;
            var iHtml = '';
            for (var j = 0; j < g.items.length; j++)
                iHtml += '<div style="font-size:var(--text-label);line-height:1.7;padding:.3rem 0;border-bottom:1px solid ' + (hi ? 'var(--line-on-primary)' : 'var(--line-subtle)') + ';opacity:' + (hi ? '.9' : '.75') + ';">— ' + g.items[j] + '</div>';
            gHtml += '<div style="padding:1.25rem 1rem;border:' + (hi ? '2px solid var(--text)' : '1px solid var(--divider)') + ';background:' + (hi ? 'var(--primary)' : 'transparent') + ';color:' + (hi ? 'var(--surface)' : 'var(--text)') + ';"><div style="font-family:var(--display);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.15em;color:' + (hi ? 'var(--highlight)' : 'var(--primary-soft)') + ';margin-bottom:.6rem;">' + (i + 1) + '. ' + g.label + '</div>' + iHtml + (g.chips ? '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.6rem;">' + g.chips.map(function (c) { return '<span style="font-size:var(--text-xs);text-transform:uppercase;letter-spacing:.08em;padding:.2rem .55rem;border:1px solid var(--hover-border-muted);color:var(--surface);">' + c + '</span>'; }).join('') + '</div>' : '') + '</div>';
        }
        
      outcomeHtml = '<div class="m-section"><div class="m-sec-label">Execution Outcome</div><div class="m-sec-title">執行成果</div><div style="display:grid;grid-template-columns:' + (o.groups.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr') + ';gap:.6rem;margin-top:.5rem;">' + gHtml + '</div></div>';
    }
    else {
        outcomeHtml =
          '<div class="m-section">' +
          '<div class="m-sec-label">Execution Outcome</div>' +
          '<div class="m-sec-title">執行成果</div>' +
          '<div class="outcome-grid ' + (o.groups.length === 3 ? 'outcome-grid-3' : 'outcome-grid-2') + '">' + 
            gHtml +
          '</div>' +
        '</div>';
    }
    var productHtml = '';
    if (p.product) {
        // Product section is rendered with semantic class names.
        // The visual rules live in style.css under "Product section inside modal".
        // This keeps JavaScript responsible for content and CSS responsible for presentation.
        var linksHtml = '';
        for (var i = 0; i < p.product.links.length; i++) {
            var lnk = p.product.links[i];
            linksHtml += '<a href="' + lnk.url + '" target="_blank" rel="noopener noreferrer" class="product-link">' + lnk.label + ' →</a>';
        }
        productHtml =
            '<div class="m-section">' +
                '<div class="m-sec-label">Product</div>' +
                '<div class="product-panel">' +
                '<div class="product-cover">' +
                '<img src="' + p.product.img + '" alt="' + p.product.title + '" onerror="this.style.display=\'none\'">' +
                '</div>' +
                '<div class="product-info">' +
                (p.product.subtitle ? '<div class="product-subtitle">' + p.product.subtitle + '</div>' : '') +
                '<div class="product-title">' + p.product.title + '</div>' +
                (p.product.desc ? '<p class="product-desc">' + p.product.desc + '</p>' : '') +
                '<div class="product-links">' + linksHtml + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
    }
    var flowHtml = p.flowSteps ? buildFlowHtml(p.flowSteps) : '';
    var sectionsHtml = '';
    for (var i = 0; i < p.sections.length; i++)
        sectionsHtml += renderSection(p.sections[i]);
    document.getElementById('modal-box').innerHTML =
        '<div class="modal-topbar"><span class="modal-proj-num">' + p.num + '</span><button class="modal-close" onclick="closeModal()">× Close</button></div>' +
            '<div class="modal-hero"><div class="modal-name">' + p.name + '</div><div class="modal-subtitle">' + p.subtitle + '</div>' + tagsHtml + '</div>' +
            '<div class="tldr-block"><div class="tldr-label">TL ; DR</div><div class="tldr-grid">' + tldrHtml + '</div></div>' +
            flowHtml + '<div class="modal-sections">' + sectionsHtml + outcomeHtml + productHtml + '</div>';
}
// Opens a modal for the project at index i.
function openModal(i) {
  renderModal(projects[i]);
  var modalBox = document.getElementById('modal-box');
  if (modalBox) {
    modalBox.scrollTop = 0;
  }
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
// Closes the modal and restores page scrolling.
function closeModal() { document.getElementById('modal').classList.remove('active'); document.body.style.overflow = ''; }
// Closes the modal when the user clicks the dark overlay, but not when clicking inside the modal box.
function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal'))
        closeModal();
}
// Keyboard support: pressing Escape closes the modal.
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape')
        closeModal();
});
document.addEventListener('mousemove', function (e) { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
// Desktop cursor hover behavior.
document.querySelectorAll('a,button,.project-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { cur.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { cur.classList.remove('hover'); });
});
// Smooth scrolling for the nav links.
document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.querySelector(a.getAttribute('href'));
        if (t)
            t.scrollIntoView({ behavior: 'smooth' });
    });
});
// Scroll reveal animation. Adds .visible when elements enter the viewport.
var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting)
            e.target.classList.add('visible');
    });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
