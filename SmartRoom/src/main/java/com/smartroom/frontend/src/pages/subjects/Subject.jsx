import { TextField,Grid } from '@mui/material';
import { useContext } from 'react';
import TeacherContext from '../home/TeacherContext';

const Subjects = (props) => {
    const{students}=useContext(TeacherContext)
    console.log(students)
  
  const handleSubmit = (e) => {
    fetch('', {
      //method: 'POST',
      //headers: { "Content-Type": "" },
      //body: 
    }).then(() => {
       
    })
  }


  return (
    <div className="new grid grid-cols-6 gap-4 bg-card rounded-lg" style={props.st}>
    
    <div className="col-start-1 col-span-6 text-[#4169E1] ">Old Marks</div>
      
      <div className="col-start-1 col-span-6" component="form" onSubmit={handleSubmit}>
      
    <Grid container spacing={2}>
      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='english_term1' 
      name='english_term1' 
      label='English' 
      type='text'
      value={props.pass.english.toString()}
      onChange={(e)=>{props.pass.setEnglish(e.target.value!==''?e.target.value.split(','):[])}}
       />
      </Grid>

      
      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='hindi_term1' 
      name='hindi_term1' 
      label='Hindi' 
      type='text'
      value={props.pass.hindi.toString()}
      onChange={(e)=>{props.pass.setHindi(e.target.value!==''?e.target.value.split(','):[])}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='sst_term1' 
      name='sst_term1' 
      label='Social Science' 
      type='text'
      value={props.pass.socialScience.toString()}
      onChange={(e)=>{props.pass.setSocialScience(e.target.value!==''?e.target.value.split(','):[])}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='science_term1' 
      name='science_term1' 
      label='Science' 
      type='text'
      value={props.pass.science.toString()}
      onChange={(e)=>{props.pass.setScience(e.target.value!==''?e.target.value.split(','):[])}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='math_term1' 
      name='math_term1' 
      label='Mathematics' 
      type='text'
      value={props.pass.math.toString()}
      onChange={(e)=>{props.pass.setMath(e.target.value!==''?e.target.value.split(','):[])}}
       />
      </Grid>
    </Grid>
    </div>
    <div className='col-start-1 col-span-6 text-[#4169E1]'>New Marks</div>
      <div className="col-start-1 col-span-6" component="form" onSubmit={handleSubmit}>
      
      <Grid container spacing={2}>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='english_term2' 
      name='english_term2' 
      label='English' 
      type='text'
      value={props.pass.newenglish}
      onChange={(e)=>{props.pass.setNewEnglish(e.target.value)}}
       />
      </Grid>

      
      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='hindi_term2' 
      name='hindi_term2' 
      label='Hindi' 
      type='text'
      value={props.pass.newhindi}
      onChange={(e)=>{props.pass.setNewHindi(e.target.value)}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='sst_term2' 
      name='sst_term2' 
      label='Social Science' 
      type='text'
      value={props.pass.newsocialScience}
      onChange={(e)=>{props.pass.setNewSocialScience(e.target.value)}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='science_term2' 
      name='science_term2' 
      label='Science' 
      type='text'
      value={props.pass.newscience}
      onChange={(e)=>{props.pass.setNewScience(e.target.value)}}
       />
      </Grid>

      <Grid item lg={2} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required 
      id='math_term2' 
      name='math_term2' 
      label='Mathematics' 
      type='text'
      value={props.pass.newmath}
      onChange={(e)=>{props.pass.setNewMath(e.target.value)}}
       />
      </Grid>
    </Grid>
    </div>
</div>
  );
};

export default Subjects;
