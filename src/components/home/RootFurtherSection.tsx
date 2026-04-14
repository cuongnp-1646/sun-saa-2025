import Image from 'next/image'

/**
 * B4 — Root Further content block.
 *
 * Figma Frame 486 (3204:10152):
 *   width: 1152px | padding: 120px 104px | border-radius: 8px | gap: 32px
 *   alignItems: center (logo centered, text full-width)
 *
 * Logo (Group 434, 290×134px):
 *   ROOT  (MM_MEDIA_Root Text):    189×67px, offset-left: 51px  ← stacked above
 *   FURTHER (MM_MEDIA_Further Text): 290×67px, flush left        ← stacked below
 *
 * Body text (3204:10156 + 3204:10161 + 3204:10162):
 *   Montserrat 24px 700, color: #FFF, textAlign: justified, lineHeight: 32px
 */
export function RootFurtherSection() {
  return (
    <section
      className="w-full flex justify-center px-4 sm:px-9 lg:px-[144px]"
      aria-label="Root Further"
    >
      {/* Frame 486 — padding: 120px 104px, gap: 32px, items-center, rounded-lg */}
      <div
        className="flex flex-col gap-[32px] items-center w-full max-w-[1152px] px-4 sm:px-[52px] lg:px-[104px] py-[60px] lg:py-[120px] rounded-lg"
        style={{ fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)' }}
      >
        {/*
         * Logo — Group 434 (290×134px)
         * ROOT (189×67): left-offset 51px (662-611=51) within the 290px container
         * FURTHER (290×67): flush left, below ROOT (no gap between them)
         */}
        <div
          className="flex flex-col"
          style={{ width: 'fit-content' }}
          aria-hidden
        >
          {/* ROOT — 189×67px, pl=51px offset */}
          <div className="pl-[26px] sm:pl-[38px] lg:pl-[51px]">
            <Image
              src="/assets/home/images/text-root.png"
              alt=""
              width={189}
              height={67}
              className="w-[124px] sm:w-[157px] lg:w-[189px] h-auto"
            />
          </div>
          {/* FURTHER — 290×67px, flush left */}
          <Image
            src="/assets/home/images/text-further.png"
            alt=""
            width={290}
            height={67}
            className="w-[190px] sm:w-[241px] lg:w-[290px] h-auto"
          />
        </div>
        {/* Accessible combined label for screen readers */}
        <span className="sr-only">ROOT FURTHER</span>

        {/* Body text — 3 nodes (first block, quote, second block) */}
        <div className="flex flex-col gap-6 w-full">
          {/* First text block — Figma 3204:10156, 512px height, justified */}
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold leading-[1.333] lg:text-justify">
            Đứng trước bối cảnh thay đổi như vũ bão của thời đại AI và yêu cầu ngày càng cao từ
            khách hàng, Sun* lựa chọn chiến lược đa dạng hóa năng lực để không chỉ nỗ lực trở thành
            tinh anh trong lĩnh vực của mình, mà còn hướng đến một cái đích cao hơn, nơi mọi Sunner
            đều là &ldquo;problem-solver&rdquo; – chuyên gia trong việc giải quyết mọi vấn đề, tìm
            lời giải cho mọi bài toán của dự án, khách hàng và xã hội.
          </p>
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold leading-[1.333] lg:text-justify">
            Lấy cảm hứng từ sự đa dạng năng lực, khả năng phát triển linh hoạt của cây thân dầu sâu
            rễ để tự phá giới hạn của mình, &ldquo;Root Further&rdquo; đã được chọn để trở thành chủ
            đề chính thức của Lễ trao giải Sun* Annual Awards 2025.
          </p>
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold leading-[1.333] lg:text-justify">
            Vượt ra khỏi việc ghi nhận đơn thuần, &ldquo;Root Further&rdquo; chính là hành trình
            chúng ta không ngừng vươn xa hơn, cắm rễ mạnh hơn, chạm đến những tầng &ldquo;địa
            chất&rdquo; sâu hơn để tiếp tục tồn tại, vươn lên và nuôi dưỡng đam mê kiến tạo giá trị
            luôn cháy bỏng của người Sun*. Mượn hình ảnh bộ rễ liên kết đi sâu vào lòng đất, thấm
            thấu những tinh chất quý giá nhất, người Sun* cũng đang &ldquo;hấp thụ&rdquo; dưỡng chất
            từ thời đại và những thách thức của thị trường — mở rộng năng lực và &ldquo;bền rễ&rdquo;
            vào kỷ nguyên AI: một tầng &ldquo;địa chất&rdquo; hoàn toàn mới, phức tạp và khó đoán,
            nhưng cũng hội tụ vô vàn tiềm năng cùng cơ hội.
          </p>

          {/* Quote block — Figma 3204:10161, font-size 20px (mobile) → same bold, centered */}
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold italic leading-[1.333] text-center">
            &ldquo;A tree with deep roots fears no storm&rdquo;
          </p>
          <p className="text-white/70 text-[14px] sm:text-[16px] lg:text-[20px] font-bold leading-[1.4] text-center">
            (Cây sâu bền rễ, bão giông chẳng nề — Ngạn ngữ Anh)
          </p>

          {/* Second text block — Figma 3204:10162, 448px height, justified */}
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold leading-[1.333] lg:text-justify">
            Trước giông bão, chỉ những tán cây có bộ rễ đủ mạnh mới có thể trụ vững. Một tổ chức
            với những cá nhân tự tin vào năng lực đa dạng, sẵn sàng sáng tạo và đón nhận thử thách,
            làm chủ sự thay đổi — là tổ chức không chỉ vững vàng trước biến động, mà còn khai thác
            được mọi tiềm năng khi đối mặt với thách thức của thị trường. Không chỉ là tên gọi của
            chương trình phát triển tổ chức, &ldquo;Root Further&rdquo; còn là lời cổ vũ, động viên
            mỗi chúng ta hãy tin vào bản thân, đam mê đào sâu, khai mở mọi tiềm năng, dám phá bỏ
            giới hạn và trở thành phiên bản đầy đủ, xuất sắc nhất của mình.
          </p>
          <p className="text-white text-[16px] sm:text-[20px] lg:text-[24px] font-bold leading-[1.333] lg:text-justify">
            Không ai biết trước tầng &ldquo;địa chất&rdquo; của ngành công nghệ và thị trường hiện
            đại còn bao nhiêu điều bí ẩn. Nhưng chúng ta tin rằng, khi &ldquo;Root Further&rdquo; đã
            trở thành tinh thần của mình, chúng ta sẽ không sợ hãi trước bất cứ vùng đất mới nào
            trên hành trình tiến về phía trước. Vì ta luôn tin rằng, trong chính những miền vô tận
            đó, là bao điều kỳ diệu và cơ hội vươn mình đang chờ ta.
          </p>
        </div>
      </div>
    </section>
  )
}
