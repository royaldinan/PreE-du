from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas

def create_pdf():
    filename = "PreEdu_Thinking_Skills_Brief.pdf"
    doc = SimpleDocTemplate(filename, pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)
    
    # Container for the 'Flowable' objects
    story = []
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#4D96FF'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#6BCB77'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=colors.HexColor('#FF6B6B'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )
    
    # --- CONTENT ---
    
    # Title
    story.append(Paragraph("PreE-du: Thinking Skills", title_style))
    story.append(Paragraph("Social Project Brief & Curriculum Integration", subtitle_style))
    story.append(Spacer(1, 0.5*inch))
    
    # 1. Project Overview
    story.append(Paragraph("1. Project Overview", heading_style))
    p_text = """
    <b>Project Name:</b> PreE-du: Thinking Skills<br/>
    <b>Tagline:</b> "Fun Learning for Future Thinkers"<br/>
    <b>Target Audience:</b> Children aged 8-12 years (Panti Asuhan & Elementary Schools)<br/>
    <b>Duration:</b> 4 Weeks Program<br/><br/>
    
    <b>Background:</b><br/>
    In the digital era, critical thinking, computational logic, and design empathy are essential skills for children. 
    However, many underprivileged children lack access to engaging educational tools that develop these skills. 
    PreE-du bridges this gap through an interactive, game-based web platform.<br/><br/>
    
    <b>Problem Statement:</b><br/>
    • Limited access to quality education for critical and creative thinking.<br/>
    • Traditional learning methods often fail to engage children effectively.<br/>
    • Lack of integration between digital skills and moral/civic values.<br/><br/>
    
    <b>Solution:</b><br/>
    PreE-du is a gamified web application featuring 9 interactive mini-games across three tracks: 
    Computational Thinking, Critical Thinking, and Design Thinking. Each game is integrated with 
    local wisdom and civic values (Pancasila, Religion, Language, Citizenship).
    """
    story.append(Paragraph(p_text, normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # 2. Learning Framework
    story.append(Paragraph("2. Learning Framework", heading_style))
    story.append(Paragraph("The curriculum is divided into three core tracks:", normal_style))
    
    tracks = [
        ("<b>🧩 Track 1: Computational Thinking</b>", "Focus: Logic, Pattern Recognition, Algorithms<br/>Games: Sorting, Pattern Recognition, Algorithms"),
        ("<b>🧠 Track 2: Critical Thinking</b>", "Focus: Analysis, Evaluation, Reasoning<br/>Games: Odd One Out, Fact vs. Opinion, Cause & Effect"),
        ("<b>💡 Track 3: Design Thinking</b>", "Focus: Empathy, Ideation, Prototyping<br/>Games: Empathy, Ideation, Prototyping")
    ]
    
    for title, desc in tracks:
        story.append(Paragraph(title, ParagraphStyle('Temp', parent=normal_style, fontName='Helvetica-Bold')))
        story.append(Paragraph(desc, normal_style))
        story.append(Spacer(1, 0.1*inch))
        
    story.append(PageBreak())
    
    # 3. Integration of Core Values (THE KEY PART)
    story.append(Paragraph("3. Integration of Core Values (4 Pillars)", heading_style))
    story.append(Paragraph("Each game module integrates values from four key subjects:", normal_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Table Data
    table_data = [
        ['Game Topic', 'Pancasila Value', 'Bahasa Indonesia', 'Agama (Religion)', 'Citizenship'],
        ['Sorting', 'Keadilan Sosial (Fairness)', 'Mengelompokkan kata benda', 'Ketelitian sebagai bentuk syukur', 'Hak dan kewajiban tertib'],
        ['Pattern', 'Persatuan (Unity in diversity)', 'Pola kalimat majemuk', 'Keteraturan ciptaan Tuhan', 'Disiplin warga negara'],
        ['Algorithm', 'Musyawarah (Step-by-step consensus)', 'Teks prosedur kompleks', 'Urutan ibadah yang benar', 'Menghormati aturan hukum'],
        ['Odd One Out', 'Menghargai perbedaan individu', 'Kata baku vs tidak baku', 'Toleransi terhadap perbedaan', 'Pluralisme masyarakat'],
        ['Fact/Opinion', 'Hikmah dalam berpendapat', 'Fakta dan opini dalam berita', 'Kebenaran vs prasangka', 'Literasi media warganegara'],
        ['Cause/Effect', 'Tanggung jawab atas tindakan', 'Kalimat sebab-akibat', 'Konsep dosa dan pahala', 'Dampak tindakan sosial'],
        ['Empathy', 'Kemanusiaan yang adil', 'Majas personifikasi & perasaan', 'Kasih sayang antar umat', 'Peduli lingkungan sosial'],
        ['Ideation', 'Kreativitas untuk kemajuan', 'Menulis gagasan kreatif', 'Berpikir positif (Husnuzan)', 'Partisipasi inovasi publik'],
        ['Prototype', 'Gotong royong membangun solusi', 'Teks eksplanasi proses', 'Amal nyata bagi sesama', 'Kolaborasi komunitas']
    ]
    
    # Create Table
    t = Table(table_data, colWidths=[1.2*inch, 1.4*inch, 1.4*inch, 1.4*inch, 1.4*inch])
    
    # Table Style
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4D96FF')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('WORDWRAP', (0, 0), (-1, -1), True)
    ])
    t.setStyle(style)
    
    story.append(t)
    story.append(Spacer(1, 0.3*inch))
    
    # 4. Implementation Plan
    story.append(Paragraph("4. Implementation Plan", heading_style))
    plan_text = """
    <b>Phase 1: Introduction (Week 1)</b><br/>
    • Ice breaking & introduction to the mascot "Si Kucing Pintar".<br/>
    • Tutorial on using the web platform.<br/>
    • Pre-test assessment.<br/><br/>
    
    <b>Phase 2: Guided Learning (Week 2-3)</b><br/>
    • Children play games in groups.<br/>
    • Facilitators guide discussions on value integration.<br/>
    • Offline activity cards completion.<br/><br/>
    
    <b>Phase 3: Reflection & Celebration (Week 4)</b><br/>
    • Presentation of prototypes/ideas.<br/>
    • Awarding certificates and badges.<br/>
    • Post-test and feedback session.
    """
    story.append(Paragraph(plan_text, normal_style))
    story.append(PageBreak())
    
    # 5. Impact & Evaluation
    story.append(Paragraph("5. Impact & Evaluation", heading_style))
    impact_text = """
    <b>Expected Outcomes:</b><br/>
    ✅ 80% improvement in logical reasoning skills.<br/>
    ✅ Increased understanding of civic and moral values.<br/>
    ✅ Higher engagement in learning activities compared to traditional methods.<br/><br/>
    
    <b>Evaluation Methods:</b><br/>
    • In-app progress tracking (Stars & Trophies).<br/>
    • Observation sheets for facilitators.<br/>
    • Simple quizzes before and after the program.
    """
    story.append(Paragraph(impact_text, normal_style))
    story.append(Spacer(1, 0.3*inch))
    
    # 6. Conclusion
    story.append(Paragraph("6. Conclusion", heading_style))
    conclusion_text = """
    PreE-du: Thinking Skills is not just a game; it is a movement to empower the next generation 
    with critical minds and noble hearts. By integrating technology with local values, we create 
    a sustainable impact for Indonesian children.<br/><br/>
    <b>"Berpikir Cerdas, Berkarakter Mulia."</b>
    """
    story.append(Paragraph(conclusion_text, normal_style))
    story.append(Spacer(1, 0.5*inch))
    
    # Footer info
    footer_style = ParagraphStyle('Footer', parent=normal_style, alignment=TA_CENTER, fontSize=10, textColor=colors.grey)
    story.append(Paragraph("Created by: Royal Dinan & Team | Date: October 2023", footer_style))
    
    # Build PDF
    doc.build(story)
    print(f"✅ SUCCESS: PDF created successfully as '{filename}'")

if __name__ == "__main__":
    create_pdf()
