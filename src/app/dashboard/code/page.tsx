"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

// Définir un type pour les langues possibles
type Language = 'javascript' | 'php' | 'java';

const codes: Record<Language, string> = {
  javascript: `
{
  "amount": 100.00,
  "currency": "USD",
  "payment_method": "credit_card",
  "card_number": "4111111111111111",
  "expiration_month": 12,
  "expiration_year": 2025,
  "cvv": "123"
}
`,
  php: `
<?php
$payment = [
  "amount" => 100.00,
  "currency" => "USD",
  "payment_method" => "credit_card",
  "card_number" => "4111111111111111",
  "expiration_month" => 12,
  "expiration_year" => 2025,
  "cvv" => "123"
];
?>
`,
  java: `
public class Payment {
  private double amount = 100.00;
  private String currency = "USD";
  private String paymentMethod = "credit_card";
  private String cardNumber = "4111111111111111";
  private int expirationMonth = 12;
  private int expirationYear = 2025;
  private String cvv = "123";

  // Getters and setters omitted for brevity
}
`
};

const CodeHighlighter: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  return (
    <Highlight theme={themes.nightOwl} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 rounded-lg overflow-auto`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codes[selectedLanguage]);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-4">
        {['javascript', 'php', 'java'].map(language => (
          <button
            key={language}
            onClick={() => setSelectedLanguage(language as Language)}
            className={`px-4 py-2 ${
              selectedLanguage === language ? 'bg-blue-500 text-white' : 'bg-gray-300'
            } rounded`}
          >
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative bg-gray-900 rounded-lg p-4">
        <CodeHighlighter code={codes[selectedLanguage]} language={selectedLanguage} />
        <button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 px-2 py-1 rounded ${copySuccess ? 'bg-green-500' : 'bg-gray-800'} text-white`}
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
