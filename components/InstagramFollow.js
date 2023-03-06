import styles from 'styles/InstagramFollow.module.scss';
import InstagramCard from 'components/InstagramCard';

export default function InstagramFollow() {
  return (
    <div>
      <div className={styles.photosSection}>
        <div className={styles.photosWrapper}>
          {[...Array(10)].map((e, i) => (
            <InstagramCard
              key={`${i}_card_inst`}
              link="https://www.instagram.com"
              img="/img/follow-instagram/ig-photo-1@2x.webp"
            />
          ))}
        </div>
      </div>
      <div className={styles.followUs}>
        <div className="container mx-auto">Follow us on instagram @vitalpawz</div>
      </div>
    </div>
  );
}
