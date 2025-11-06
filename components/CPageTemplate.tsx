import React from 'react';
import PriorityBadge from './PriorityBadge';
import StrategicStory from './StrategicStory';
import ExpandableSection from './ExpandableSection';
import { LucideIcon } from 'lucide-react';

interface CPageTemplateProps {
  icon: LucideIcon;
  title: string;
  data: any;
}

export default function CPageTemplate({ icon: Icon, title, data }: CPageTemplateProps) {
  const { meta, tldr, situationSnapshot, story, findings } = data;

  // Parse markdown-style content into HTML-safe JSX
  const renderMarkdown = (text: string) => {
    if (!text) return null;

    // Split by paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim());

    return paragraphs.map((para, idx) => {
      // Handle bullet points
      if (para.startsWith('- ') || para.startsWith('* ')) {
        const items = para.split('\n').filter(line => line.trim());
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700">
                {item.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Handle bold text
      let content = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

      // Handle source citations
      content = content.replace(/\[Source:\s*([^\]]+)\]/g, '<span class="text-xs text-gray-500">[Source: $1]</span>');

      return (
        <p
          key={idx}
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cava-olive-500 to-cava-terracotta-500 rounded-xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            {meta?.focus && (
              <p className="text-lg text-gray-600 mt-1">{meta.focus}</p>
            )}
          </div>
        </div>

        {meta && (
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {meta.analysis_date && (
              <span className="bg-cava-warm-100 px-3 py-1 rounded-full">
                📅 {meta.analysis_date}
              </span>
            )}
            {meta.target_audience_context && (
              <span className="bg-cava-olive-100 px-3 py-1 rounded-full">
                🎯 {meta.target_audience_context}
              </span>
            )}
          </div>
        )}
      </div>

      {/* TL;DR Section */}
      {tldr && (
        <div className="bg-gradient-to-br from-cava-warm-50 to-white border-2 border-cava-terracotta-300 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <span>🎯</span>
            <span>TL;DR</span>
          </h2>
          <div className="prose prose-lg max-w-none">
            {tldr.summary && renderMarkdown(tldr.summary)}
          </div>

          {tldr.priority && (
            <div className="mt-6 bg-white border border-red-300 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <PriorityBadge level={tldr.priority.level} size="lg" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tldr.priority.title}</h3>
                  <p className="text-gray-700">{tldr.priority.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Situation Snapshot */}
      {situationSnapshot && (
        <div className="bg-white border border-cava-olive-200 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <span>📊</span>
            <span>Situation Snapshot</span>
          </h2>
          <div className="prose max-w-none">
            {renderMarkdown(situationSnapshot)}
          </div>
        </div>
      )}

      {/* Strategic Story */}
      {story && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span>🎭</span>
            <span>Strategic Imperative Story</span>
          </h2>
          <StrategicStory
            challenge={story.challenge}
            insight={story.insight}
            imperative={story.imperative}
          />
        </div>
      )}

      {/* Full Findings */}
      {findings && findings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <span>📈</span>
            <span>Full Findings</span>
          </h2>
          <div className="space-y-6">
            {findings.map((finding: any, idx: number) => (
              <ExpandableSection
                key={idx}
                title={finding.title}
                priority={finding.priority}
                defaultExpanded={idx < 2}
              >
                <div className="prose max-w-none">
                  {renderMarkdown(finding.content)}
                </div>

                {/* Opportunities */}
                {finding.opportunities && finding.opportunities.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-bold text-green-700 flex items-center space-x-2">
                      <span>🟢</span>
                      <span>Opportunities</span>
                    </h4>
                    {finding.opportunities.map((opp: any, oppIdx: number) => (
                      <div
                        key={oppIdx}
                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-bold text-gray-900">{opp.title}</h5>
                          <PriorityBadge level={opp.priority} size="sm" />
                        </div>
                        <p className="text-sm text-gray-700">{opp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Risks */}
                {finding.risks && finding.risks.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-bold text-red-700 flex items-center space-x-2">
                      <span>🔴</span>
                      <span>Risks</span>
                    </h4>
                    {finding.risks.map((risk: any, riskIdx: number) => (
                      <div
                        key={riskIdx}
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-bold text-gray-900">{risk.title}</h5>
                          <PriorityBadge level={risk.priority} size="sm" />
                        </div>
                        <p className="text-sm text-gray-700">{risk.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </ExpandableSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
