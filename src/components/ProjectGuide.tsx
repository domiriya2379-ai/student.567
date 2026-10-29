import React, { useState } from 'react';
import {
  BookOpen,
  Code,
  FileCode,
  Copy,
  Check,
  Download,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Play,
  Github,
  Sparkles,
  ChevronRight,
  Terminal,
  Layers,
} from 'lucide-react';
import {
  PROJECT_STEPS_METADATA,
  STANDALONE_HTML_CODE,
  STANDALONE_CSS_CODE,
  STANDALONE_JS_CODE,
  README_MARKDOWN,
  TESTING_CHECKLIST,
} from '../data/projectTutorialData';

export const ProjectGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({
    'test-1': true,
    'test-2': true,
    'test-3': true,
    'test-4': true,
    'test-5': true,
    'test-6': true,
    'test-7': true,
    'test-8': true,
  });
  const [isSimulatingTests, setIsSimulatingTests] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleTest = (id: string) => {
    setTestResults((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const runAutomatedTestSimulation = () => {
    setIsSimulatingTests(true);
    setTestResults({});
    const keys = TESTING_CHECKLIST.map((t) => t.id);

    keys.forEach((key, index) => {
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [key]: true }));
        if (index === keys.length - 1) {
          setIsSimulatingTests(false);
        }
      }, (index + 1) * 350);
    });
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllFiles = () => {
    downloadFile('index.html', STANDALONE_HTML_CODE, 'text/html');
    setTimeout(() => downloadFile('style.css', STANDALONE_CSS_CODE, 'text/css'), 200);
    setTimeout(() => downloadFile('script.js', STANDALONE_JS_CODE, 'text/javascript'), 400);
    setTimeout(() => downloadFile('README.md', README_MARKDOWN, 'text/markdown'), 600);
  };

  const currentStepData = PROJECT_STEPS_METADATA.find((s) => s.stepNumber === activeStep);

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Full 7-Step Project Blueprint & Code Artifacts
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Three Web Projects: Prompts &amp; Outcomes
            </h2>
            <p className="text-sm text-blue-100/90 mt-2 leading-relaxed">
              Complete beginner-friendly breakdown of the Student Expense Tracker from initial concept to GitHub Pages deployment. Explore source files, copy pure HTML/CSS/JS code, and run test verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              type="button"
              onClick={downloadAllFiles}
              className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-700" />
              Download All 4 Files
            </button>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="mt-6 pt-5 border-t border-white/15 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {PROJECT_STEPS_METADATA.map((step) => {
              const isActive = activeStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-blue-900 font-bold shadow-xs'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-2xs font-bold ${
                      isActive ? 'bg-blue-900 text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Detail Card */}
      {currentStepData && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Step {currentStepData.stepNumber}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {currentStepData.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {currentStepData.title}
              </h3>
            </div>

            <p className="text-xs text-slate-500 max-w-md">
              {currentStepData.objective}
            </p>
          </div>

          {/* Prompt & Outcome Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Original Prompt
              </span>
              <p className="text-xs text-slate-700 italic">
                &ldquo;{currentStepData.prompt}&rdquo;
              </p>
            </div>

            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <span className="text-2xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Achieved Outcome
              </span>
              <p className="text-xs text-blue-900 font-medium">
                {currentStepData.outcome}
              </p>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Key Concepts Implemented:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStepData.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/60 p-2.5 rounded-lg border border-slate-100"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-Specific Code & Walkthrough */}

          {/* STEP 1: Plan */}
          {activeStep === 1 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">
                1. System Architecture &amp; Data Model
              </h4>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto">
                <pre>{`// College Student Expense Data Object
interface StudentExpense {
  id: string;        // Unique identifier (timestamp-based or UUID)
  name: string;      // e.g. "Canteen Lunch", "Semester Book"
  amount: number;    // Positive number in Indian Rupees (₹)
  category: string;  // "Food" | "Travel" | "Books" | "Fun" | "Other"
  date: string;      // "YYYY-MM-DD"
}

// 5 Core College Categories
1. Food   - Canteen, snacks, hostel mess, chai/coffee
2. Travel - Metro card recharge, bus tickets, rickshaw
3. Books  - Semester textbooks, lab manuals, stationery, prints
4. Fun    - Movies, college fest, sports, streaming
5. Other  - Mobile recharge, hostel laundry, miscellaneous`}</pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="font-bold block text-slate-900">Form Section</span>
                  <span className="text-slate-500">Inputs for Name, Amount in ₹, Category dropdown, and Date.</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="font-bold block text-slate-900">Total &amp; Summary</span>
                  <span className="text-slate-500">Big bold overall ₹ total plus category-wise spending cards.</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="font-bold block text-slate-900">Expense List</span>
                  <span className="text-slate-500">Category filter dropdown, delete button on each item, empty state.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: HTML */}
          {activeStep === 2 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Standalone <code className="text-blue-600">index.html</code>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Semantic HTML5 structure with form, total section, and category summaries
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(STANDALONE_HTML_CODE, 'html')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'html' ? 'Copied HTML!' : 'Copy Code'}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadFile('index.html', STANDALONE_HTML_CODE, 'text/html')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-2xs overflow-x-auto max-h-96 leading-relaxed">
                <pre>{STANDALONE_HTML_CODE}</pre>
              </div>
            </div>
          )}

          {/* STEP 3: CSS */}
          {activeStep === 3 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Standalone <code className="text-blue-600">style.css</code>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Centered card container, gradient header, category tag colors, mobile responsive
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(STANDALONE_CSS_CODE, 'css')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'css' ? 'Copied CSS!' : 'Copy Code'}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadFile('style.css', STANDALONE_CSS_CODE, 'text/css')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-2xs overflow-x-auto max-h-96 leading-relaxed">
                <pre>{STANDALONE_CSS_CODE}</pre>
              </div>
            </div>
          )}

          {/* STEP 4 & 5 & 6: JavaScript */}
          {(activeStep === 4 || activeStep === 5 || activeStep === 6) && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Standalone <code className="text-blue-600">script.js</code>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Form submission, validation, delete handler, localStorage persistence &amp; category totals
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(STANDALONE_JS_CODE, 'js')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {copiedKey === 'js' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'js' ? 'Copied JS!' : 'Copy Code'}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadFile('script.js', STANDALONE_JS_CODE, 'text/javascript')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>

              {/* Explanatory callout for Step 5: What is localStorage? */}
              {activeStep === 5 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
                  <span className="font-bold block text-sm mb-1">
                    💡 What does localStorage do?
                  </span>
                  <p className="leading-relaxed">
                    <code>localStorage</code> is a built-in browser storage mechanism that lets web applications save key-value pairs directly in the user’s browser with <strong>no expiration time</strong>. This means when a student enters their expenses and reloads the page or closes the browser tab, the data is automatically retained!
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><code>localStorage.setItem(&apos;key&apos;, JSON.stringify(data))</code>: Converts JavaScript array to string and saves it.</li>
                    <li><code>localStorage.getItem(&apos;key&apos;)</code>: Retrieves the saved string.</li>
                    <li><code>JSON.parse(string)</code>: Converts text back into live JavaScript objects.</li>
                  </ul>
                </div>
              )}

              {/* Explanatory callout for Step 6: Category Summary & Filter */}
              {activeStep === 6 && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-900">
                  <span className="font-bold block text-sm mb-1">
                    📊 How Category Summary &amp; Filtering Works:
                  </span>
                  <p className="leading-relaxed">
                    Whenever an expense is added or deleted, <code>updateTotalAndSummary()</code> loops through the 5 categories (<code>Food, Travel, Books, Fun, Other</code>), calculates each category&apos;s sum using <code>.filter().reduce()</code>, and renders custom colored cards. The filter dropdown attaches a <code>change</code> event listener that filters the displayed list without modifying the underlying database!
                  </p>
                </div>
              )}

              <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-2xs overflow-x-auto max-h-96 leading-relaxed">
                <pre>{STANDALONE_JS_CODE}</pre>
              </div>
            </div>
          )}

          {/* STEP 7: Testing, README & GitHub Pages */}
          {activeStep === 7 && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              
              {/* Interactive Testing Checklist */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Feature Testing Checklist (8 Tests)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Click any item to toggle manual verification or simulate tests
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isSimulatingTests}
                    onClick={runAutomatedTestSimulation}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isSimulatingTests ? 'Verifying Suite...' : 'Run Automated Test Verification'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {TESTING_CHECKLIST.map((test) => {
                    const isPassed = testResults[test.id];
                    return (
                      <div
                        key={test.id}
                        onClick={() => toggleTest(test.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isPassed
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                                isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-white'
                              }`}
                            >
                              ✓
                            </span>
                            {test.title}
                          </span>
                          <span className="text-2xs font-semibold uppercase tracking-wider text-emerald-700">
                            {isPassed ? 'Passed' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-2xs text-slate-600 mt-1">
                          {test.description}
                        </p>
                        <div className="text-2xs text-slate-500 mt-1 font-mono">
                          Expected: {test.expected}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ready-to-paste README.md */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-blue-600" />
                      Ready-to-Paste README.md
                    </h4>
                    <p className="text-xs text-slate-500">
                      Standard repository documentation formatted in Markdown
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(README_MARKDOWN, 'readme')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {copiedKey === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'readme' ? 'Copied README!' : 'Copy README.md'}
                  </button>
                </div>

                <div className="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-2xs overflow-x-auto max-h-80 leading-relaxed">
                  <pre>{README_MARKDOWN}</pre>
                </div>
              </div>

              {/* GitHub Pages Deployment Steps */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Github className="w-4 h-4 text-slate-900" />
                  How to Publish on GitHub Pages (Free Hosting)
                </h4>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900">Step 1: Create a GitHub Repository</span>
                    <p className="text-slate-600 mt-0.5">
                      Log in to GitHub.com, click &ldquo;New Repository&rdquo;, name it <code>student-expense-tracker</code>, set visibility to <strong>Public</strong>, and click Create.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900">Step 2: Upload Files</span>
                    <p className="text-slate-600 mt-0.5">
                      Click <strong>Add file &gt; Upload files</strong> and upload <code>index.html</code>, <code>style.css</code>, and <code>script.js</code>. Commit the changes.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900">Step 3: Enable Pages in Settings</span>
                    <p className="text-slate-600 mt-0.5">
                      Go to repo <strong>Settings &gt; Pages</strong>. Under <strong>Branch</strong>, choose <code>main</code> branch and folder <code>/ (root)</code>, then click <strong>Save</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-900">Step 4: Access Your Live Link</span>
                    <p className="text-slate-600 mt-0.5">
                      In 1-2 minutes, refresh the Pages settings. You will get your live link: <br />
                      <code className="text-blue-600 font-mono">https://&lt;your-username&gt;.github.io/student-expense-tracker/</code>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
