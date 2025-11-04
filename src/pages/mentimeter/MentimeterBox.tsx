
export default function MentimeterBox() {
  return (
   <div  style={{ position: 'relative', paddingBottom: '56.25%', paddingTop: '35px', height: 0, overflow: 'hidden' }}>
     <iframe
       sandbox='allow-scripts allow-same-origin allow-presentation'
       allowFullScreen
       allowTransparency
       frameBorder='0'
       height='315'
       src='https://www.mentimeter.com/app/presentation/aluqeyyuss96n1ntxfobmgkc1o2g7ckb/embed'
       style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
       width='420'
     />
   </div>
  )
}
