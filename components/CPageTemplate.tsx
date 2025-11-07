import React from 'react';
import { PriorityCard } from './PriorityCard';
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
    <>
      {/* Hero Section */}
      <section className="py-16 mb-8" style={{backgroundColor: '#f9d000'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{backgroundColor: '#00020d'}}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold" style={{color: '#00020d'}}>{title}</h1>
              {meta?.focus && (
                <p className="text-lg mt-1" style={{color: '#00020d'}}>{meta.focus}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Metadata Badges */}
        {meta && (
          <div className="flex flex-wrap gap-3 text-sm mb-12">
            {meta.analysis_date && (
              <span className="px-3 py-1 rounded-full" style={{backgroundColor: '#fff8e8', color: '#00020d'}}>
                📅 {meta.analysis_date}
              </span>
            )}
            {meta.target_audience_context && (
              <span className="px-3 py-1 rounded-full" style={{backgroundColor: '#fff8e8', color: '#00020d'}}>
                🎯 {meta.target_audience_context}
              </span>
            )}
          </div>
        )}

      {/* TL;DR Section */}
      {tldr && tldr.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">TL;DR</h2>
            <p className="text-lg text-gray-600">
              Key findings at a glance—scannable insights with priority indicators
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-6">
            {tldr.map((item: any, idx: number) => (
              <PriorityCard
                key={idx}
                priority={item.priority as 'critical' | 'important' | 'supporting'}
                title={item.title}
                description={item.implication}
                source={{ text: 'Source', url: '' }}
                variant="bulleted"
                implication={item.implication}
              />
            ))}
          </div>
        </section>
      )}

      {/* Strategic Imperative Story */}
      {story && (
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Strategic Imperative Story
            </h2>
            <p className="text-lg text-gray-600">
              The narrative connecting Challenge → Insight → Strategic Imperative
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StrategicStory
              challenge={story.challenge}
              insight={story.insight}
              imperative={story.imperative}
            />
          </div>
        </section>
      )}

      {/* Full Findings */}
      {((findings && findings.length > 0) || situationSnapshot) && (
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Full Findings</h2>
            <p className="text-lg text-gray-600">
              Comprehensive analysis and detailed research—expand sections for depth
            </p>
          </div>

          {/* Structured findings (if available) */}
          {findings && findings.length > 0 && (
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
          )}

          {/* Fallback: Show Situation Snapshot if no structured findings */}
          {(!findings || findings.length === 0) && situationSnapshot && (
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="prose max-w-none">
                {renderMarkdown(situationSnapshot)}
              </div>
            </div>
          )}
        </section>
      )}
      </div>
    </>
  );
}
